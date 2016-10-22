var rows, cols, counter;
rows = 10;    																		//default number of rows
cols = 20;																			//default number of columns
counter=1;
var visiblePartStart = 1;
var visiblePartEnd = 15;	 																		//starting number for seat allocation
var enabled = [];       															// array to store the seats chosen by user
var editable =false;   															    // determines whether buttons can be pressed or not
var changed=false;																	// determines whether seats orientation has been modified from the default
var numOfButtons =0;																// total number of usable seats
var temp="";																		// stores the seat number temporarily. It is used in ifButtonIsPressed()

function insertInput() // checks the input value
{
if(document.getElementById("rowsInput").value>0&&document.getElementById("colsInput").value>0)
	{
																				// checks if the input is a number greater than zero
	editable=true; 																// allow the user to choose the seats
	document.getElementById("rowsInput").disabled=true;
	document.getElementById("colsInput").disabled=true;
	rows=document.getElementById("rowsInput").value;  							//sets the rows
	cols=document.getElementById("colsInput").value;  							// sets the cols
	changed=true;
	reset();   																	// rebuilds the table
	}
}
function loadValue(a, b){
	start();
	//console.log('a : ' + a);
	//console.log('b : '+ b);
	var sum=0;
	var seatsPerColumn = 0;

	for (var i = 0; i<a.length;i++){
		var character = a.charAt(i)
		if(character != "-"){
			seatsPerColumn+=parseInt(character)
		}
	}

	var columns = Math.round(b/seatsPerColumn);
	console.log('total columns = '+columns)
	cols = columns;
	createTable();

	for (var i = 0; i<a.length;i++){
		var character = a.charAt(i)
		if(character == "-"){
			sum++;
			removeRow(sum);
		}
		else{
			sum+=parseInt(character);
			seatsPerColumn+=parseInt(character)
			//console.log('sum : '+sum)
		}
	}
	document.getElementById(""+4+","+4+"").innerText='B';
	document.getElementById(""+4+","+4+"").style.backgroundColor="gray";
	document.getElementById(""+4+","+2+"").innerText='B';
	document.getElementById(""+4+","+2+"").style.backgroundColor="gray";
	document.getElementById(""+5+","+5+"").innerText='B';
	document.getElementById(""+5+","+5+"").style.backgroundColor="gray";

}

function ifButtonIsPressed()													//this function is loaded when the user clicks on any button while choosing seats for the new table
{
if(editable==true)
{
if(document.getElementById(temp).style.backgroundColor=="gray")					//if the seat has not been selected yet, the seat turns white when pressed
	{
	document.getElementById(temp).style.backgroundColor="white";
	enabled.push(temp);															//we then insert this seat number to the array consisting of selected seats
	}
else if(document.getElementById(temp).style.backgroundColor=="white")			//if the seat has been selected before, the seat turns gray when pressed
	{
	document.getElementById(temp).style.backgroundColor="gray";
	var index = enabled.indexOf(temp);
	if (index > -1)
		{
	   	     enabled.splice(index, 1);												//we remove this seat number from the array consisting of selected seats
		}
	}
}
}

function combine(var1, var2){
temp = ""+var1+","+var2+"";
}

function insertWindow() 														// this function is loaded when the user presses the 'new' button
{

document.getElementById("insert").innerHTML="";
document.getElementById("insert").innerHTML+=("Enter the table size<br><br>");

document.getElementById("insert").innerHTML+=("Rows:<input type='text' id='rowsInput' size='3'>");
document.getElementById("insert").innerHTML+=("      Cols:<input type='text' id='colsInput' size='3'>");
																				//allows user to input the number of rows and columns

document.getElementById("insert").innerHTML+=('<br><button onClick="insertInput()">Submit</button>');
																				// once rows and columns size is determined, it goes to insertInput() function

}


function createTable()															//creates the table
{
document.getElementById("table").innerHTML +="<p align='center'><br>";
document.getElementById("table").innerHTML +="<table>";
for(var i=1;i<=rows;i++)
	{
	document.getElementById("table").innerHTML +="<tr>";
	for(var j=1;j<=cols;j++)
		{
																				//creates a table with rows and cols defined by the user
		document.getElementById("table").innerHTML +="<td>";
		document.getElementById("table").innerHTML +="<button style='height:50px;width:50px;padding:17px;' id='"+i+","+j+"' onClick='combine("+(""+i+","+j+"")+");ifButtonIsPressed();'> </button>";
		document.getElementById("table").innerHTML +="</td>";
																				//creates a button with fixed size. When clicked, it loads ifButtonIsPress()
		document.getElementById(""+i+","+j+"").disabled = false;
		if(editable==true||changed==true)										//if the user has created a new table, the seats are gray in color
		document.getElementById(""+i+","+j+"").style.backgroundColor ="gray";
		else																	// if we are creating a default table, the seats are gray in color
		document.getElementById(""+i+","+j+"").style.backgroundColor ="white";
		}
	document.getElementById("table").innerHTML +="</tr><br>";
	}
document.getElementById("table").innerHTML +="</table>";
document.getElementById("table").innerHTML +="</p>";
}



function chooseArea()															//enables selected seats by the user and makes them visible
{

if(false)																//checks if seat orientation has noot been modified
	{
	enabled=["1,1","1,2","1,3","1,5","1,6","1,7","1,8","1,10","1,11","1,13","1,14","1,15"
	,"2,1","2,2","2,3","2,5","2,6","2,7","2,8","2,10","2,11","2,13","2,14","2,15"
	,"3,5","3,6","3,7","3,8","3,10","3,11","3,12","3,13","3,14","3,15"
	,"4,13","4,14","4,15"];														//this array contains seat layout as displayed in the interview

	for(var i=1;i<=rows;i++)													// this for loop is responsible for the rows of the table
		{
		for(var j=1;j<=cols;j++)												// this for loop is responsible for the columns of the table
			{
			for (var k =0;k<enabled.length;k++)									// this for loop is responsible for the values in the array
				{
				if((""+i+","+j+"")==enabled[k])									// checks if the values in k matches any seat numbers. If yes, it enables the seat and makes it visible
					{
					document.getElementById(""+i+","+j+"").disabled =false;
					document.getElementById(""+i+","+j+"").style.visibility="visible";
					numOfButtons++;
					}
				}
				if(document.getElementById(""+i+","+j+"").style.visibility!="visible") // if any seat numbers are not listed in the array, the seat becomes hidden and disabled
				{
				document.getElementById(""+i+","+j+"").disabled =true;
				document.getElementById(""+i+","+j+"").style.visibility="hidden";
				}
			}
		}
	}
else if(enabled.length>0)														//checks if the user have selected more than zero seats
{
	for(var i=1;i<=rows;i++)
		{
		for(var j=1;j<=cols;j++)
			{
			for (var k =0;k<enabled.length;k++)
				{
				if((""+i+","+j+"")==enabled[k])
					{
					document.getElementById(""+i+","+j+"").disabled =false;
					document.getElementById(""+i+","+j+"").style.visibility="visible";
					numOfButtons++;
					}
				}
				if(document.getElementById(""+i+","+j+"").style.visibility!="visible")
				{
				document.getElementById(""+i+","+j+"").disabled =true;
				document.getElementById(""+i+","+j+"").style.visibility="hidden";
				}
			}
		}
		removeRow(2);
}
else																			//checks if the user has not selected any seats
	{
	//document.getElementById("preTable").innerHTML ="Choose allowable seats<br>"
	//document.getElementById("postTable").innerHTML ="<button onClick='chooseArea();removePrePostText();'>ok</button>";
	//removeRow(2);
	//console.log('Else 3');
	}

}


function add()																	//allocates a passanger to a seat
{
	var found = false;															// variable to determine whether a seat has been assigned to the counter

	for (var loop=1;loop<=3 && found==false;loop++)
	{
	//loop 1: assign isle seats
	//loop 2: assign window seats
	//loop 3: assign middle seats

		for(var i=1;i<=rows && found==false;i++)								//This loop is responsible for the rows
		{
			for (var j=1;j<=cols && found==false;j++)							// This loop is responsible for the cols
				{

				if((""+document.getElementById(""+i+","+j+"").textContent )==' '            //checks if the button contains any number already
				&& document.getElementById(""+i+","+j+"").style.visibility=="visible") 		//checks if it is visible
					{
					if(loop==1																//conditions for isle seats
					&&(j>1&&j<cols)
					&&((""+document.getElementById(""+i+","+(j+1)+"").style.visibility=="hidden")||(""+document.getElementById(""+i+","+(j-1)+"").style.visibility=="hidden"))
					)
						{
							//yes this is an isle seat
							document.getElementById(""+i+","+j+"").textContent  =counter;					//adds a number to the seat
							document.getElementById(""+i+","+j+"").style.backgroundColor='#80bfff';			//changes the color of a seat
							counter++;																		// add one to the counter
							found=true;																		//exits the loop
							break;

						}

					else if (loop==2 && (j==1 || j==cols))
						{
							//yes this is a window seat
							document.getElementById(""+i+","+j+"").textContent  =counter;
							document.getElementById(""+i+","+j+"").style.backgroundColor='#80ff80';
							counter++;
							found=true;
							break;

						}
					else if(loop==3)
						{
							//yes this is a middle seat
							document.getElementById(""+i+","+j+"").textContent  =counter;
							document.getElementById(""+i+","+j+"").style.backgroundColor='#ff6666';
							counter++;
							found=true;
							break;
						}
					}
				}
			}
	}
	if(counter>(numOfButtons+1))
	alert("All seats are occupied");
}


function removePrePostText(){													// function to check if seats has been chosen by the user
	if(enabled.length>0){
	editable=false;
	document.getElementById("preTable").innerHTML ="";
	document.getElementById("postTable").innerHTML ="";
	}
}
function seeLeft(){
	//console.log('seeing left')
}
function seeRight(){
	//console.log('seeing right')
}


function reset()																//rebuild the table
{
	document.getElementById("table").innerHTML ="";
	document.getElementById("preTable").innerHTML ="";
	document.getElementById("postTable").innerHTML ="";
	document.getElementById("insert").innerHTML ="";
	counter =1;
	createTable();
	enabled=[];
	if(changed==true)
	{editable=true;}																//if the user successfully entered the new row and column size, it allows the user to choose the seats
	chooseArea();
}

function print()
{
alert(enabled.length);
}


function removeRow(r){
	//console.log('Remove');
	for(var i=1;i<=cols;i++){												// this for loop is responsible for the columns of the table
			document.getElementById(""+r+","+i+"").disabled =true;
			document.getElementById(""+r+","+i+"").style.visibility="hidden";
		}
}


function fade(){
	//console.log('Fade');
	for(var i=1;i<=cols;i++){
		for(var j=1; j<=rows; j++){
				document.getElementById(""+j+","+i+"").style.backgroundColor="gray";
		}
	}
}

function hightlight(start,end){
		//console.log('Hightligt');
		for(var i=Math.round(start);i<=end;i++){
			for(var j=1; j<=rows; j++){
					document.getElementById(""+j+","+i+"").style.backgroundColor="white";
			}
		}
}

function getAvailable(start,end){
	//console.log('Available');
		for(var i=1;i<=cols;i++){
			for(var j=start; j<=rows; j++){
					if(document.getElementById(""+j+","+i+"").style.backgroundColor="white"){
						if(j<=end){
							return 0;
						}
						else{
							return j-end;
						}
					}
			}
		}
	return 0;
}

function talkPref(){
	console.log('TIME TO TALK');
	createMap();
	for(var i=1; i<11; i++)
		for(var j=1; j<21; j++)
		{
			//console.log (' outpt '+i +'		'+j+ '	'+M[i][j]);
			document.getElementById(""+i+","+j+"").innerText=M[i][j];
		}
		color(1);
}

function sleepPref(){
	console.log('TIME TO SLEEP');
	createMap();
	color(0);
}

function color(isHigh){
	var bomb=0;
	for(var i=1; i<=rows; i++)
		for(var j=1; j<=cols; j++)
		{
			if(bomb<M[i][j])
				bomb=M[i][j];
		}
		console.log('bomb		'+bomb);
		for(var i=1; i<=rows; i++)
			for(var j=1; j<=cols; j++)
			{
				var c;
				if(isHigh){
					c=M[i][j]/bomb;
				}
				else{
					c=1-M[i][j]/bomb;
				}
				document.getElementById(""+i+","+j+"").style.backgroundColor="rgba(0,255,0,"+c+")";
			}
			console.log('COLORED');
}

function nonePref(){
	console.log('None');
	hightlight(1,cols);
}


var V=new Array(rows+1), M=new Array(rows+1);
for(var temp=0; temp<rows+1; temp++){
	V[temp]=new Array(cols+1);
	M[temp]=new Array(cols+1);
}

function start(){
	for(var i=0; i<11; i++)
		for(var j=0; j<21; j++)
			M[i][j]=0;
}

function resetVisited(){
	console.log(rows + '	' + cols);
	for(var i=1; i<11; i++)
		for(var j=1; j<21; j++){
			//console.log(i +'	'+j);
				V[i][j]=0;
		}
}

//code.stephenmorley.org
function Queue(){var a=[],b=0;this.getLength=function(){return a.length-b};this.isEmpty=function(){return 0==a.length};this.enqueue=function(b){a.push(b)};this.dequeue=function(){if(0!=a.length){var c=a[b];2*++b>=a.length&&(a=a.slice(b),b=0);return c}};this.peek=function(){return 0<a.length?a[b]:void 0}};

var q1=new Queue(), q2=new Queue(), d;
function createMap(){
	for(var i=1; i<11; i++)
		for(var j=1; j<21; j++){
			//console.log( i + '	' + j);
			if(document.getElementById(""+i+","+j+"").innerText == 'B')
			{
				resetVisited();
				M[i][j]+=6;
				q1.enqueue(i);
				q2.enqueue(j);
				d=5;
				q1.enqueue(0);
				map();
				while(!q1.isEmpty())
					q1.dequeue();
				while(!q2.isEmpty())
					q2.dequeue();
				console.log(q1.isEmpty() + '	'+q2.isEmpty());
			}
		}
}

function map(){
	var i=q1.dequeue();
	var j=q2.dequeue();
	V[i][j]=1;
	//console.log(i+'		'+j);
	var row = [-1, -1, -1,  0, 0,  1, 1, 1];
  var col = [-1,  0,  1, -1, 1, -1, 0, 1];
	for (var k = 0; k < 8; k++)
        if (Check(i + row[k], j + col[k])){
					M[i + row[k]][j+col[k]]+=d;
					V[i + row[k]][j+col[k]]=1;
					q1.enqueue(i + row[k]);
					q2.enqueue(j+col[k]);
				}
	if(d==0)
		return;
	if(q1.peek()==0){
		console.log(d);
		d--;
		q1.dequeue();
		q1.enqueue(0);
	}
	map();
}

function Check(i,j){
	return (i >= 1) && (i <= rows) && (j >= 1) && (j <= cols) && (!V[i][j]);
}
