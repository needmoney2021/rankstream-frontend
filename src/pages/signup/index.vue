<script lang='ts' setup>
import {ref} from 'vue'


interface SignupForm {
    email: string
    password: string
    passwordConfirm: string
    businessNumber: string
    businessType: 'individual' | 'corporate'
    phoneNumber: string
    address: string
    companyName?: string
    companyAddress?: string
    companyPhone?: string
}

const form = ref<SignupForm>({
    email: '',
    password: '',
    passwordConfirm: '',
    businessNumber: '',
    businessType: 'individual',
    phoneNumber: '',
    address: ''
})

const errors = ref<Record<string, string>>({})

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

    if (!form.value.businessNumber) {
        newErrors.businessNumber = '사업자등록번호는 필수입니다'
    } else if (!/^\d{10}$/.test(form.value.businessNumber)) {
        newErrors.businessNumber = '사업자등록번호는 10자리 숫자여야 합니다'
    }

    if (form.value.businessType === 'corporate') {
        if (!form.value.companyName) {
            newErrors.companyName = '회사명은 필수입니다'
        }

        if (!form.value.companyAddress) {
            newErrors.companyAddress = '회사 주소는 필수입니다'
        }

        if (!form.value.companyPhone) {
            newErrors.companyPhone = '회사 전화번호는 필수입니다'
        } else if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(form.value.companyPhone)) {
            newErrors.companyPhone = '올바른 전화번호 형식을 입력해주세요'
        }
    }

    errors.value = newErrors
    return Object.keys(newErrors).length === 0
}

const handleSubmit = () => {
    if (validateForm()) {
        // Form submission logic would go here
        alert('회원가입이 요청되었습니다. 관리자 승인 후 이용 가능합니다.')
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
                        v-model="form.businessNumber"
                        :class="{ 'border-red-500': errors.businessNumber }"
                        class="w-full p-2 border rounded"
                        placeholder="숫자만 입력 (하이픈 제외)"
                        type="text"
                    >
                    <p v-if="errors.businessNumber" class="text-sm text-red-500">{{ errors.businessNumber }}</p>
                </div>

                <div class="space-y-1">
                    <label class="block font-medium">사업자 구분 *</label>
                    <div class="flex gap-4">
                        <label class="inline-flex items-center">
                            <input v-model="form.businessType" class="mr-2" type="radio" value="individual">
                            개인
                        </label>
                        <label class="inline-flex items-center">
                            <input v-model="form.businessType" class="mr-2" type="radio" value="corporate">
                            법인
                        </label>
                    </div>
                </div>

                <div v-if="form.businessType === 'corporate'" class="space-y-4">
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
                        <label class="block font-medium" for="companyAddress">회사주소 *</label>
                        <textarea
                            id="companyAddress"
                            v-model="form.companyAddress"
                            :class="{ 'border-red-500': errors.companyAddress }"
                            class="w-full p-2 border rounded"
                            rows="2"
                        ></textarea>
                        <p v-if="errors.companyAddress" class="text-sm text-red-500">{{ errors.companyAddress }}</p>
                    </div>

                    <div class="space-y-1">
                        <label class="block font-medium" for="companyPhone">회사 대표 전화번호 *</label>
                        <input
                            id="companyPhone"
                            v-model="form.companyPhone"
                            :class="{ 'border-red-500': errors.companyPhone }"
                            class="w-full p-2 border rounded"
                            type="tel"
                        >
                        <p v-if="errors.companyPhone" class="text-sm text-red-500">{{ errors.companyPhone }}</p>
                    </div>
                </div>

                <div v-else class="space-y-4">
                    <div class="space-y-1">
                        <label class="block font-medium" for="phoneNumber">전화번호 (선택)</label>
                        <input
                            id="phoneNumber"
                            v-model="form.phoneNumber"
                            class="w-full p-2 border rounded"
                            type="tel"
                        >
                    </div>

                    <div class="space-y-1">
                        <label class="block font-medium" for="address">주소 (선택)</label>
                        <textarea
                            id="address"
                            v-model="form.address"
                            class="w-full p-2 border rounded"
                            rows="2"
                        ></textarea>
                    </div>
                </div>

                <button
                    class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    type="submit"
                >
                    회원가입
                </button>
            </form>
        </main>
    </div>
</template>

<style scoped>
</style>
