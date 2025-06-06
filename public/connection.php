<?php
     $servername="localhost";
     $username="root";
     $password="";
     $dbname="login2";
$conn = mysqli_connect("localhost","root","","login2");
if($conn){
    echo "Registered  Successfully...!";
}else{
    echo "Registration Unccessful";
}
?>