document.querySelector(".admin-upload-btn").addEventListener("click", function(){
    
    const announceTitle = document.getElementById("title-input").value
    const announceContent = document.getElementById("content-input").value
    const fileInput1 = document.getElementById("announce-img-input")
    const fileInput2 = document.getElementById("movie1-input")
    const fileInput3 = document.getElementById("movie2-input")
    const fileInput4 = document.getElementById("movie3-input")
    const fileInput5 = document.getElementById("movie4-input")
    const file1 = fileInput1.files[0]
    const file2 = fileInput2.files[0]
    const file3 = fileInput3.files[0]
    const file4 = fileInput4.files[0]
    const file5 = fileInput5.files[0]
    var fileName1;
    var fileName2;
    var fileName3;
    var fileName4;
    var fileName5;

    if(document.getElementById("check1").checked){
        fileName1 = "unavailable.png"
    } else {
        uploadImage("announce-img-input", function(url) {
            console.log(url); // Debug: Check the uploaded image URL
            fileName1 = url ? url : "unavailable.png";
            console.log("fileName1:", fileName1);
          });
    }

    if(document.getElementById("check2").checked){
        fileName2 = "unavailable.png"
    } else {
        uploadImage("movie1-input", function(url) {
            console.log(url); // Debug: Check the uploaded image URL
            fileName2 = url ? url : "unavailable.png";
            console.log("fileName2:", fileName2);
          });
    }

    if(document.getElementById("check3").checked){
        fileName3 = "unavailable.png"
    } else {
        uploadImage("movie2-input", function(url) {
            console.log(url); // Debug: Check the uploaded image URL
            fileName3 = url ? url : "unavailable.png";
            console.log("fileName3:", fileName3);
          });
    }

    if(document.getElementById("check4").checked){
        fileName4 = "unavailable.png"
    } else {
        uploadImage("movie3-input", function(url) {
            console.log(url); // Debug: Check the uploaded image URL
            fileName4 = url ? url : "unavailable.png";
            console.log("fileName4:", fileName4);
          });
    }

    if(document.getElementById("check5").checked){
        fileName5 = "unavailable.png"
    } else {
        uploadImage("movie4-input", function(url) {
            console.log(url); // Debug: Check the uploaded image URL
            fileName5 = url ? url : "unavailable.png";
            console.log("fileName5:", fileName5);
          });
    }

    // setTimeout(function(){
    //     window.location.assign(`/homeUpdate/${fileName3}/${fileName2}/${fileName4}/${fileName5}/${fileName1}/${announceTitle}/${announceContent}`)
    // })

})


function uploadImage(chosenFileId) {
    const fileInput = document.getElementById(chosenFileId);
    console.log(fileInput);
    const file = fileInput.files[0];
    console.log(file);

    if (file) {
      const formData = new FormData();
      formData.append('imageFile', file);
      console.log(formData)

      fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        callback(data.location);// Handle the response from the server
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }