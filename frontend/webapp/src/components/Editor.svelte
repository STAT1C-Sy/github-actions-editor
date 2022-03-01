<script>
    let myModal = document.getElementById("myModal");
    let myInput = document.getElementById("myInput");
</script>

<style>
    .col-main {
        text-align: center;
    }

    .middle-card {
        margin-bottom: 16px;
    }

    .col-config > select,
    .col-config > h5,
    .col-config > button {
        margin-bottom: 16px;
    }
</style>

<div class="container">
    <div class="row">
        <div class="col col-main">
            <div class="card">
                <div class="card-body col-config">
                    <h5>Configuration</h5>

                    <select
                        class="form-select"
                        aria-label="Default select example">
                        <option selected>Default Branch</option>
                        <option value="1">other branch</option>
                        <option value="2">develop</option>
                        <option value="3">deploy</option>
                    </select>
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        + Add Branch
                    </button>

                    <select
                        class="form-select"
                        aria-label="Default select example">
                        <option selected>Trigger</option>
                        <option value="1">other branch</option>
                        <option value="2">develop</option>
                        <option value="3">deploy</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-6 col-main">
            <div class="card middle-card">
                <div class="card-body">
                    <h5>Repository name</h5>
                </div>
            </div>
            <div class="card middle-card">
                <div class="card-body">
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        + Add Pipeline step
                    </button>
                </div>
            </div>
        </div>
        <div class="col col-main">
            <div class="card">
                <div class="card-body">
                    This is some text within a card body.
                </div>
            </div>
        </div>
    </div>
    <div
        class="modal fade modal-dialog modal-dialog-centered modal-dialog-scrollable"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Modal title
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close" />
                </div>
                <div class="modal-body">...</div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</div>

<link
    href="https://fonts.googleapis.com/css?family=Overpass:100,400"
    rel="stylesheet" />
