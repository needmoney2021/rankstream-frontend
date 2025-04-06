<script lang='ts' setup>
import {onMounted, ref} from 'vue'

const currentDoc = ref<string>('getstarted')
const docContent = ref<string>('')

const docs = [
    {id: 'getstarted', name: 'GetStarted'},
    {id: 'api', name: 'API'},
    {id: 'price', name: 'Price'}
]

const loadMarkdown = async (docId: string) => {
    try {
        const response = await fetch(`/md/${docId}.md`)
        if (!response.ok) {
            throw new Error(`Failed to load ${docId} documentation`)
        }
        docContent.value = await response.text()
        currentDoc.value = docId
    } catch (error) {
        console.error('Error loading markdown:', error)
        docContent.value = '# Error\n\nFailed to load documentation.'
    }
}

onMounted(async () => {
    await loadMarkdown('getstarted')
})
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

        <main class="container mx-auto p-4 flex flex-col md:flex-row gap-8">
            <aside class="w-full md:w-64 space-y-2">
                <button
                    v-for="doc in docs"
                    :key="doc.id"
                    :class="{ 'bg-gray-200': currentDoc === doc.id }"
                    class="block w-full text-left p-2 rounded hover:bg-gray-100"
                    @click="loadMarkdown(doc.id)"
                >
                    {{ doc.name }}
                </button>
            </aside>

            <article class="flex-1 prose prose-lg max-w-none">
                <div v-if="docContent" v-html="docContent"></div>
                <div v-else class="p-4 bg-gray-100 rounded">
                    Loading documentation...
                </div>
            </article>
        </main>
    </div>
</template>

<style scoped>
</style>
