function validate() {
  //alert("event fired")
  let emailId = document.getElementById("emailId").value;
  // if(emailId.length==0){
  //     alert("Enter the emailId")
  //     return false;
  // }else
  //
  let user1 = { emailId: "raj@gmail.com", password: "raj@123" };
  let user2 = { emailId: "ravi@gmail.com", password: "ravi@123" };
  let user3 = { emailId: "ramesh@gmail.com", password: "ramesh@123" };
  let users = [];
  users.push(user1);
  users.push(user2);
  users.push(user3);

  if (emailId == "admin@gmail.com") {
    alert("successfully login");
    sessionStorage.setItem("user", "admin@gmail.com");
    return true;
  } else {
    alert("failure try once again");
    return false;
  }
}
