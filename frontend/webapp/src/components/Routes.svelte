<script>
    import Home from "@/components/Home.svelte";
    import Editor from "@/components/Editor.svelte";
    import Dashboard from "@/components/Dashboard.svelte";
    import ErrorPage from "@/components/ErrorPage.svelte";
    import { fade } from "svelte/transition";

    export let location;

    const routes = [
        {
            location: "/",
            component: Home,
            secure: false,
        },
        {
            location: "/error",
            component: ErrorPage,
            secure: false,
        },
        {
            location: "/dashboard",
            component: Dashboard,
            secure: true,
        },
    ];

    if(!routes.some(elem => location == elem.location)) {
        location = "/error"
    }
</script>

<style>
</style>
{#each routes as route}
    {#if location == route.location}
        <svelte:component this={route.component} />
    {/if}
{/each}
