let jsonstore = _storage.getItem("CheckInActiStorage");
let activityCount = 0;
if (jsonstore != null){
  activityCount = JSON.parse(jsonstore)
    .EachActivity
    .filter(a=>a.exist)
    .length;
}

if (activityCount === 0) {
  // subtract 2 from count and total of progress because of the two activity-related screens
  let map = {2:1,3:2,5:3};
   $(".progress-tracker")
    .each((i,e)=>{
      let [count, total] = $(e).attr("progress").split("/");
      $(e).attr("progress", `${map[count] || 0}/${total-2}`);
    });
}