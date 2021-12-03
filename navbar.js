$("header").html(
  `<nav class="navbar navbar-expand-md bg-dark">
  <div class="container">
    <a class="navbar-brand" href="index.html">LOGO</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link btn btn-primary text-white" href="checkin.html">Check in</a>
        </li>
        <li class="nav-item">
            <a class="nav-link btn btn-primary text-white" id=nav-view-entries href="view-entries.html">My progress</a>
        </li>
        <li class="nav-item">
            <a class="nav-link btn btn-primary text-white" id=nav-view-entries href="./goal-setting.html?view=goals-activities">Set Goals</a>
        </li>
      </ul>
      <ul class="navbar-nav float-end">
        <li class="nav-item">
          <a class="nav-link" href="?view=settings"><i class="fa fa-cog me-1"> Settings</i></a>
        </li>
      </ul>
    </div>
  </div>
</nav>`);