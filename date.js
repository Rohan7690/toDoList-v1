
//we can also declare above function in another way

module.exports = date;

function date(){
var today = new Date();
var day = today.toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric"
});
return day;
}
