<script lang='ts' setup>
</script>

<template>
    <div class="min-h-screen">
        <header class="container mx-auto p-4 flex justify-between items-center">
            <div class="text-2xl font-bold">RankStream</div>
            <nav class="flex gap-4">
                <router-link class="hover:text-blue-600" to="/docs">Docs</router-link>
                <router-link class="hover:text-blue-600" to="/signup">SignUp</router-link>
            </nav>
        </header>

        <main class="container mx-auto p-4 mt-8">
            <div class="max-w-3xl mx-auto text-center">
                <h1 class="text-4xl font-bold mb-6">RankStream</h1>
                <p class="text-xl mb-8">
                    최적의 네트워크 마케팅 솔루션으로 귀하의 비즈니스를 혁신하세요
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    <div class="p-6 bg-white rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold mb-3">회원 트리 연동</h3>
                        <p>복잡한 회원 네트워크를 쉽게 관리하고 시각화합니다</p>
                    </div>

                    <div class="p-6 bg-white rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold mb-3">실시간 주문/실적 연동</h3>
                        <p>모든 주문과 실적 데이터를 실시간으로 확인하고 분석합니다</p>
                    </div>

                    <div class="p-6 bg-white rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold mb-3">주기적 실적 분석</h3>
                        <p>데이터 기반 인사이트로 비즈니스 성과를 최적화합니다</p>
                    </div>

                    <div class="p-6 bg-white rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold mb-3">등급별 포인트 환급</h3>
                        <p>회원 등급에 따른 정확한 포인트 계산과 환급 시스템</p>
                    </div>
                </div>

                <div class="mt-12">
                    <router-link class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg" to="/signup">
                        지금 시작하기
                    </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
</style>
