function validate() {
  let email = document.getElementById("emailId").value;
  let password = document.getElementById("passwordId").value;

  let user1 = { email: "raj@gmail.com", password: "raj@123" };
  let user2 = { email: "ravi@gmail.com", password: "ravi@123" };
  let user3 = { email: "ramesh@gmail.com", password: "ramesh@123" };
  let users = [];
  users.push(user1);
  users.push(user2);
  users.push(user3);

  let user = users.find(
    (item) => item.email === email && item.password === password
  );

  if (user) {
    alert("successfully login");
    sessionStorage.setItem("user", user.email);
    return true;
  } else {
    alert("failure try once again");
    return false;
  }
}

function contactSubmit() {
  alert("Message sent!");
  return true;
}
