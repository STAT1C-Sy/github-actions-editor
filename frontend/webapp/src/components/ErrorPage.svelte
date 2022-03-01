<script>
    const params = new URLSearchParams(window.location.search);

    const reason = params.reason;
</script>

<style>
    body {
        overflow: hidden;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    .container {
        margin-top: 20vh;
    }
</style>
<body>
    <div class="container text-center">
        <h1>An Error Occured :(</h1>
        <h3>Error reason: {reason}</h3>
        <p><a href="http://localhost:3020/dashboard">Back to Dashboard</a></p>
    </div>
</body>

<link
    href="https://fonts.googleapis.com/css?family=Overpass:100,400"
    rel="stylesheet" />
