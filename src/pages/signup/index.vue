<script lang='ts' setup>
import {ref, watch} from 'vue'
import {useRouter} from "vue-router";


interface SignupForm {
    email: string
    password: string
    passwordConfirm: string
    businessLicense: string
    businessType: 'INDIVIDUAL' | 'CORPORATION'
    phoneNumber: string
    postalCode?: string
    address?: string
    addressDetail?: string
    name?: string
    companyName?: string
    representative?: string
    companyPostalCode?: string
    companyAddress?: string
    companyAddressDetail?: string
    companyPhone?: string
}

const router = useRouter()

const form = ref<SignupForm>({
    email: '',
    password: '',
    passwordConfirm: '',
    businessLicense: '',
    businessType: 'INDIVIDUAL',
    phoneNumber: '',
    address: ''
})

const errors = ref<Record<string, string>>({})

const isFetching = ref(false)

watch(() => form.value.businessType, () => {
    errors.value = {}
})

const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!form.value.email) {
        newErrors.email = '이메일은 필수입니다'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        newErrors.email = '유효한 이메일 주소를 입력해주세요'
    }

    if (!form.value.password) {
        newErrors.password = '비밀번호는 필수입니다'
    } else if (form.value.password.length < 8) {
        newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다'
    }

    if (form.value.password !== form.value.passwordConfirm) {
        newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다'
    }

    if (!form.value.businessLicense) {
        newErrors.businessLicense = '사업자등록번호는 필수입니다'
    }

    if (form.value.businessType === 'CORPORATION') {
        if (!form.value.companyName) {
            newErrors.companyName = '회사명은 필수입니다'
        }

        if (!form.value.companyPostalCode) {
            newErrors.companyPostalCode = '회사 주소는 필수입니다'
        }

        if (!form.value.companyAddress) {
            newErrors.companyAddress = '회사 주소는 필수입니다'
        }

        if (!form.value.companyAddressDetail) {
            newErrors.companyAddressDetail = '회사 주소는 필수입니다'
        }

        if (!form.value.representative) {
            newErrors.representative = '대표자명은 필수입니다'
        }

        if (!form.value.companyPhone) {
            newErrors.companyPhone = '회사 전화번호는 필수입니다'
        } else if (!/^010-\d{4}-\d{4}$/.test(form.value.companyPhone)) {
            newErrors.companyPhone = '올바른 전화번호 형식을 입력해주세요'
        }
    } else {
        if (!form.value.name) {
            newErrors.name = '사업자명은 필수입니다'
        }
    }

    errors.value = newErrors
    return Object.keys(newErrors).length === 0
}

const getCsrfToken = async (): Promise<string | null> => {
    await fetch(`${import.meta.env.VITE_API_BASE}/csrf`, {
        credentials: 'include'
    })

    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('XSRF-TOKEN='))

    return cookie?.split('=')[1] || null
}

const handleSubmit = async () => {
    if (validateForm()) {
        isFetching.value = true // 요청 중 로딩 상태 관리
        try {

            const csrfToken = await getCsrfToken()

            const response = await fetch(`${import.meta.env.VITE_API_BASE}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": csrfToken || ""
                },
                credentials: 'include',
                body: JSON.stringify(form.value),
            })

            if (!response.ok) {
                const errorData = await response.json()
                alert(`회원가입 실패: ${errorData.message || "알 수 없는 오류입니다."}`)
                return
            }

            alert("회원가입이 요청되었습니다. 관리자 승인 후 이용 가능합니다.")
            await router.push("/")
        } catch (error) {
            alert('회원가입 요청 중 오류가 발생했습니다.')
        } finally {
            isFetching.value = false // 요청 완료 후 로딩 상태 해제
        }
    }
}
</script>

<template>
    <div class="min-h-screen">
        <header class="container mx-auto p-4 flex justify-between items-center">
            <router-link class="text-2xl font-bold" to="/">RankStream</router-link>
            <nav class="flex gap-4">
                <router-link class="hover:text-blue-600" to="/docs">Docs</router-link>
                <router-link class="hover:text-blue-600" to="/signup">SignUp</router-link>
            </nav>
        </header>

        <main class="container mx-auto p-4 max-w-xl">
            <h1 class="text-3xl font-bold mb-6 text-center">회원 가입</h1>

            <form class="space-y-4" @submit.prevent="handleSubmit">
                <div class="space-y-1">
                    <label class="block font-medium" for="email">이메일 (아이디) *</label>
                    <input
                        id="email"
                        v-model="form.email"
                        :class="{ 'border-red-500': errors.email }"
                        class="w-full p-2 border rounded"
                        type="email"
                    >
                    <p class="text-sm text-gray-600">현재 사용중인 이메일을 입력해주세요. 아이디로 사용됩니다.</p>
                    <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
                </div>

                <div class="space-y-1">
                    <label class="block font-medium" for="password">비밀번호 *</label>
                    <input
                        id="password"
                        v-model="form.password"
                        :class="{ 'border-red-500': errors.password }"
                        class="w-full p-2 border rounded"
                        type="password"
                    >
                    <p v-if="errors.password" class="text-sm text-red-500">{{ errors.password }}</p>
                </div>

                <div class="space-y-1">
                    <label class="block font-medium" for="passwordConfirm">비밀번호 확인 *</label>
                    <input
                        id="passwordConfirm"
                        v-model="form.passwordConfirm"
                        :class="{ 'border-red-500': errors.passwordConfirm }"
                        class="w-full p-2 border rounded"
                        type="password"
                    >
                    <p v-if="errors.passwordConfirm" class="text-sm text-red-500">{{ errors.passwordConfirm }}</p>
                </div>

                <div class="space-y-1">
                    <label class="block font-medium" for="businessNumber">사업자등록번호 *</label>
                    <input
                        id="businessNumber"
                        v-model="form.businessLicense"
                        :class="{ 'border-red-500': errors.businessLicense }"
                        class="w-full p-2 border rounded"
                        placeholder="숫자만 입력 (하이픈 제외)"
                        type="text"
                    >
                    <p v-if="errors.businessLicense" class="text-sm text-red-500">{{ errors.businessLicense }}</p>
                </div>

                <div class="space-y-1">
                    <label class="block font-medium">사업자 구분 *</label>
                    <div class="flex gap-4">
                        <label class="inline-flex items-center">
                            <input v-model="form.businessType" class="mr-2" type="radio" value="INDIVIDUAL">
                            개인
                        </label>
                        <label class="inline-flex items-center">
                            <input v-model="form.businessType" class="mr-2" type="radio" value="CORPORATION">
                            법인
                        </label>
                    </div>
                </div>

                <div v-if="form.businessType === 'CORPORATION'" class="space-y-4">
                    <div class="space-y-1">
                        <label class="block font-medium" for="companyName">회사명 *</label>
                        <input
                            id="companyName"
                            v-model="form.companyName"
                            :class="{ 'border-red-500': errors.companyName }"
                            class="w-full p-2 border rounded"
                            type="text"
                        >
                        <p v-if="errors.companyName" class="text-sm text-red-500">{{ errors.companyName }}</p>
                    </div>

                    <div class="space-y-1">
                        <label class="block font-medium" for="businessNumber">대표자명 *</label>
                        <input
                            id="representative"
                            v-model="form.representative"
                            :class="{ 'border-red-500': errors.representative }"
                            class="w-full p-2 border rounded"
                            type="text"
                        >
                        <p v-if="errors.representative" class="text-sm text-red-500">{{ errors.representative }}</p>
                    </div>

                    <div class="space-y-1">
                        <label class="block font-medium" for="companyAddress">회사주소 *</label>


                        <div class="space-y-1">
                            <label class="block font-medium" for="postalCode">우편번호 *</label>
                            <input
                                id="postalCode"
                                v-model="form.companyPostalCode"
                                :class="{ 'border-red-500': errors.companyPostalCode }"
                                class="w-full p-2 border rounded"
                                type="text"
                            >
                            <p v-if="errors.companyPostalCode" class="text-sm text-red-500">{{ errors.companyPostalCode }}</p>
                        </div>

                        <div class="space-y-1">
                            <label class="block font-medium" for="address">주소 *</label>
                            <input
                                id="address"
                                v-model="form.companyAddress"
                                :class="{ 'border-red-500': errors.companyAddress }"
                                class="w-full p-2 border rounded"
                                type="text"
                            >
                            <p v-if="errors.companyAddress" class="text-sm text-red-500">{{ errors.companyAddress }}</p>
                        </div>

                        <div class="space-y-1">
                            <label class="block font-medium" for="addressDetail">상세 주소 *</label>
                            <input
                                id="addressDetail"
                                v-model="form.companyAddressDetail"
                                :class="{ 'border-red-500': errors.companyAddressDetail }"
                                class="w-full p-2 border rounded"
                                type="text"
                            >
                            <p v-if="errors.companyAddressDetail" class="text-sm text-red-500">{{ errors.companyAddressDetail }}</p>
                        </div>

                        <p v-if="errors.companyAddressDetail" class="text-sm text-red-500">{{ errors.companyAddressDetail }}</p>
                    </div>

                    <div class="space-y-1">
                        <label class="block font-medium" for="companyPhone">회사 대표 전화번호 *</label>
                        <input
                            id="companyPhone"
                            v-model="form.companyPhone"
                            :class="{ 'border-red-500': errors.companyPhone }"
                            class="w-full p-2 border rounded"
                            placeholder="010-1234-5678"
                            type="tel"
                        >
                        <p v-if="errors.companyPhone" class="text-sm text-red-500">{{ errors.companyPhone }}</p>
                    </div>
                </div>

                <div v-else class="space-y-4">

                    <div class="space-y-1">
                        <label class="block font-medium" for="businessNumber">사업자명 *</label>
                        <input
                            id="name"
                            v-model="form.name"
                            :class="{ 'border-red-500': errors.name }"
                            class="w-full p-2 border rounded"
                            type="text"
                        >
                        <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name }}</p>
                    </div>

                    <div class="space-y-1">
                        <label class="block font-medium" for="phoneNumber">전화번호 (선택)</label>
                        <input
                            id="phoneNumber"
                            v-model="form.phoneNumber"
                            class="w-full p-2 border rounded"
                            placeholder="010-1234-5678"
                            type="tel"
                        >
                    </div>

                    <div class="space-y-1">
                        <div class="space-y-4">
                            <div class="space-y-1">
                                <label class="block font-medium" for="postalCode">우편번호 (선택)</label>
                                <input
                                    id="postalCode"
                                    v-model="form.postalCode"
                                    class="w-full p-2 border rounded"
                                    type="text"
                                >
                            </div>

                            <div class="space-y-1">
                                <label class="block font-medium" for="address">주소 (선택)</label>
                                <input
                                    id="address"
                                    v-model="form.address"
                                    class="w-full p-2 border rounded"
                                    type="text"
                                >
                            </div>

                            <div class="space-y-1">
                                <label class="block font-medium" for="addressDetail">상세 주소 (선택)</label>
                                <input
                                    id="addressDetail"
                                    v-model="form.addressDetail"
                                    class="w-full p-2 border rounded"
                                    type="text"
                                >
                            </div>
                        </div>
                    </div>
                </div>


                <div class="text-center">
                    <button
                        type="submit"
                        :disabled="isFetching"
                        class="w-full p-3 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        <span v-if="!isFetching">회원가입</span>
                        <span v-else>
                            <svg class="animate-spin h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                        </span>
                    </button>
                </div>

            </form>
        </main>
    </div>
</template>

<style scoped>
</style>
