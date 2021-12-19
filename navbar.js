var pageName = location.pathname.split(".")[0].substring(1);

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
          <a class="nav-link btn btn-primary" id="nav-checkin" href="checkin.html">Check In</a>
        </li>
        <li class="nav-item menu-separation">
            <a class="nav-link btn" id="nav-view-entries" href="view-entries.html">My Progress</a>
        </li>
        <li class="nav-item menu-separation">
            <a class="nav-link btn" id="nav-goal-setting" href="./goal-setting.html?view=goals-activities">Set Goals</a>
        </li>
      </ul>
      
    </div>
  </div>
</nav>`
);
$("header").find(`#nav-${pageName}`).addClass("active");

document.title = "Myndful.ly";
