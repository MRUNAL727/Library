
var nm;
var auth;
var pg;
var chebx;
var bookArr = [];
var row;
   var cell0;
   var cell1;
   var cell2;
   var cell3;
   var cell4;

function Book(name, author, pages, read)
{
  this.name = name;
  this.pages = pages;
  this.author = author;
  this.read = read;
}

function addFunction()
{
  // console.log('hi');
  document.getElementById("formAdd").style.display = "block";
}

function closeForm()
{
  document.getElementById("formAdd").style.display = "none";
}


function saveFunction()
{  
    var keyFound= false;
    nm = document.getElementById("name").value;
    auth = document.getElementById("author").value;
    pg = document.getElementById("pages").value;
    chebx = document.getElementById("read");
    checkVal= false;
     if(chebx.checked == true )
     {
       checkVal = true;
     }
     else
     {
       checkVal =false;
     }


       for(var j=0; j<=localStorage.length;j++)
       {  
         
          //  console.log(localStorage.key(j)+ " " + nm);
           if(nm === localStorage.key(j))
           {
             alert("alredy exists");
             closeForm();
              keyFound=true;
              break;
             //return;
           }
         
        }
          if(keyFound === false)
          {
            var key = new Book(nm,auth,pg,checkVal);
             var objString = JSON.stringify(key);
             localStorage.setItem(nm, objString);
             myLibrary();
             closeForm();
            
          }
       
      document.getElementById("form").reset();
    closeForm();
      
}

   


function myLibrary()
{
  document.getElementById('displayTable').style.display = "block";
  var table = document.getElementById('displayTable');

  while (table.rows.length > 1) 
  {
    table.deleteRow(1);
  }
 

  for(i=0;i<localStorage.length; ++i)
  { 
    
   document.getElementById('displayTable').style.display = "block";

   
   var book = localStorage.getItem(localStorage.key(i));
   var jsonString = JSON.parse(book);
   bookArr.push(jsonString);
 
    
   row = table.insertRow(1);
   cell0 = row.insertCell(0);
   cell1 = row.insertCell(1);
   cell2 = row.insertCell(2);
   cell3 = row.insertCell(3);
   cell4 = row.insertCell(4);
   cell0.innerHTML = jsonString.name;
   cell1.innerHTML = jsonString.author;
   cell2.innerHTML = jsonString.pages;
   if(jsonString.read=== true)
   {
     cell3.innerHTML = '&#10003'; 
     cell3.setAttribute('style', 'color:green');
   }
   else 
   {
     cell3.innerHTML ='&#10007';
     cell3.setAttribute('style', 'color:red');
   }
   cell4.innerHTML = '&#128465';
  

  console.log
   nm = '';
    auth='';
    pg=null;
    checkVal=false;
}
addRowHandlers();
}

function deleteAll()
{
  localStorage.clear();
  myLibrary();
}


function addRowHandlers() {
  var table = document.getElementById("displayTable");
  var rows = table.getElementsByTagName("tr");
 
  for (i = 0; i < rows.length; i++) {
     var currentRow = table.rows[i];
     currentRow.onclick = createClickHandler(currentRow);
  }
 }
 
 function createClickHandler(row){
 
             return function() { 
                    var cell = row.getElementsByTagName("td")[4];
                    var keyToDelete = row.getElementsByTagName("td")[0].innerText;
                    console.log(keyToDelete);

                   

                
                      if(confirm("Do you want to delete this book?")=== true)
                      {
                        for(var m=0; m<localStorage.length; m++)
                        {
                          if(keyToDelete=== localStorage.key(m))
                          {
                            localStorage.removeItem(keyToDelete);
                          }
                        }  
                        alert("Removed succesfully");
                      }  
                     myLibrary();
               };
 
 }

 function searchBook()
 {
    document.getElementById("searchForm").style.display= "block";
 }
 
 function searchBooks()
{  
   var srch = document.getElementById("search").value;
   //alert(srch);
   var found=false;
   for(var m=0; m<localStorage.length; m++)
   {
     if(srch === localStorage.key(m))
     {
       found=true;
     }
  
   }
   if(found === true)
   {
     alert("book found");
      found=false;
      
   }
   else
   {
     alert("not found");
   }
   myLibrary();
   cancel();
}

 function cancel()
 {
   document.getElementById("searchForm").style.display =  "none";
   document.getElementById("searchForm").reset();
  }
