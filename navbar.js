$("header").html(
  `<nav class="navbar navbar-expand-md bg-dark">
  <div class="container">
    <a class="navbar-brand" href="view-entries.html"> <img src="./img/myndful_cream.png" width="200" height="35" class="d-inline-block align-text-top"></a>
    <button class="navbar-menu-button navbar-dark navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item menu-separation">
        <div id= nav-checkin></div>
          <a class="nav-link btn btn-primary text-white" id=nav-view-entries href="checkin.html">Check In</a>
        </li>
        <li class="nav-item menu-separation">
            <a class="nav-link btn text-white" id=nav-view-entries href="view-entries.html">My Progress</a>
        </li>
        <li class="nav-item menu-separation">
            <a class="nav-link btn text-white" id=nav-view-entries href="./goal-setting.html?view=goals-activities">Set Goals</a>
        </li>
      </ul>
      <ul class="navbar-nav float-end">
        <li class="nav-item">
          <a class="nav-link" href="checkin.html?view=settings"><i class="fa fa-cog me-1"></i>Settings</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`);
