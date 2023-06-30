document.querySelector(".admin-upload-btn").addEventListener("click", function(){
    
    const announceTitle = document.getElementById("title-input").value
    const announceContent = document.getAnimations("content-input").value
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

    if(document.getElementById("check1").checked){
        const fileName1 = "unavailable.png"
    } else {
        const fileName1 = file1.name
        uploadImage("announce-img-input")
    }

    if(document.getElementById("check2").checked){
        const fileName2 = "unavailable.png"
    } else {
        const fileName2 = file2.name
        uploadImage("movie1-input")
    }

    if(document.getElementById("check3").checked){
        const fileName3 = "unavailable.png"
    } else {
        const fileName3 = file3.name
        uploadImage("movie2-input")
    }

    if(document.getElementById("check4").checked){
        const fileName4 = "unavailable.png"
    } else {
        const fileName4 = file4.name
        uploadImage("movie3-input")
    }

    if(document.getElementById("check5").checked){
        const fileName5 = "unavailable.png"
    } else {
        const fileName5 = file5.name
        uploadImage("movie4-input")
    }

    setTimeout(function(){
        window.location.assign(`/homeUpdate/${fileName2}/${fileName3}/${fileName4}/${fileName5}/${fileName1}/${announceTitle}/${announceContent}`)
    })

})


function uploadImage(chosenFile) {
    const fileInput = document.getElementById(chosenFile);
    const file = fileInput.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('imageFile', file);

      fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Handle the response from the server
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }