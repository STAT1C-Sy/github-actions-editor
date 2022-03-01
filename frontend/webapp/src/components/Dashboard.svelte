<script>
    import { onMount } from "svelte";
    let repoData;

    onMount(async () => {
        //save token to localStorage if provided
        const params = new URLSearchParams(window.location.search);
        if(params.token) {
            window.localStorage.setItem("token", )
        } else {

        }

        //fetch repository data from api
        
        const repoResponse = await fetch("http://localhost:3002/api/v1/repos", {
            headers: {
                token: `${params.get('token')}`,
            },
        });
        repoData = await repoResponse.json();
    });
</script>

<style>
    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 3em;
        font-weight: 100;
    }


</style>

<div class="container text-center">
        <h1>Dashboard</h1>
        {#if repoData === undefined}
            Loading Data...
        {:else}
            {#each repoData as repo}
            <div class="row mt-3 justify-content-center">
                <div class="col-6 col-main">
                    <div class="card">
                        <div class="card-body col-config">
                            <h5 class="card-title">{repo.name}</h5>
                            {JSON.stringify(repo)}
                            <a href="{repo.html_url}" class="card-link" target="_blank">Access Repo</a>
                            <a href="#" class="card-link">Edit Pipeline</a>
                        </div>
                    </div>
                </div>
            </div>
            {/each}
        {/if}
</div>

<link
    href="https://fonts.googleapis.com/css?family=Overpass:100,400"
    rel="stylesheet" />
