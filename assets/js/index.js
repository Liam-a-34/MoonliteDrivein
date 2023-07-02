var s3 = new AWS.S3({
  accessKeyId: "AKIAQPNAVKZEWCVSDIH6",
  secretAccessKey: "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",
  region: 'us-east-2'
});

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
        fileName1 = file1.name
        uploadImage("announce-img-input");
    }
    if(document.getElementById("check2").checked){
        fileName2 = "unavailable.png"
    } else {
        fileName2 = file2.name
        uploadImage("movie1-input");
    }
    if(document.getElementById("check3").checked){
        fileName3 = "unavailable.png"
    } else {
        fileName3 = file3.name
        uploadImage("movie2-input");
    }

    if(document.getElementById("check4").checked){
        fileName4 = "unavailable.png"
    } else {
        fileName4 = file4.name
        uploadImage("movie3-input");
    }

    if(document.getElementById("check5").checked){
        fileName5 = "unavailable.png"
    } else {
        fileName5 = file5.name
        uploadImage("movie4-input");
    }

    setTimeout(function(){
        window.location.href = `/homeUpdate/${fileName3}/${fileName2}/${fileName4}/${fileName5}/${fileName1}/${announceTitle}/${announceContent}`
    },1000)

    setTimeout(function(){
      window.location.assign("/")
    },3000)

})


function uploadImage(chosenFileId) {
  const fileInput = document.getElementById(chosenFileId);
  const file = fileInput.files[0];
  const fileName = file.name;

  const reader = new FileReader();

  reader.onloadend = function () {
    const fileData = new Uint8Array(reader.result);
    const params = {
      Bucket: 'moonlitebucket',
      Key: fileName,
      Body: fileData,
      ACL: 'public-read' // Optional: Set the ACL permissions for the uploaded file
    };

    s3.upload(params, function (err, data) {
      if (err) {
        console.log('Error uploading file:', err);
      } else {
        console.log('File uploaded successfully.', data);
      }
    });
  };

  reader.readAsArrayBuffer(file);
  }