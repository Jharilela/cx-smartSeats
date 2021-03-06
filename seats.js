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
var checked= 'N';

function loadValue(a,b){
	start();
	var seatsPerColumn = 0,sum=0;

		for (var i = 0; i<a.length;i++){
			var character = a.charAt(i)
			if(character != "-"){
				seatsPerColumn+=parseInt(character)
			}
		}

		var columns = Math.round(b/seatsPerColumn);
		//console.log('total columns = '+columns)
		cols = columns;
		createTable();

		for (var i = 0; i<a.length;i++){
			var character = a.charAt(i)
			if(character == "-"){
				sum++;
				//console.log(sum);
				removeRow(sum);
			}
			else{
				sum+=parseInt(character);
				seatsPerColumn+=parseInt(character)
				//console.log('sum : '+sum)
			}
		}

		// Block seats and plant bombs
}

function bookedSeats(json){
	var seats=json.passengerSeats;
	//console.log(seats);
	for(var i=0; i<seats.length; i++){
		//console.log(seats[i]);
		//console.log(seats[i].row+'		'+seats[i].col);
		if(typeof seats[i].row == "undefined" || typeof seats[i].col == "undefined")
		{
			console.log('EROOR');
			continue;
		}
		console.log(seats[i].row +'	'+seats[i].col);
		document.getElementById(""+seats[i].row+","+seats[i].col+"").innerText="X";
		document.getElementById(""+seats[i].row+","+seats[i].col+"").disabled="true";
		document.getElementById(""+seats[i].row+","+seats[i].col+"").style.fontSize = "30px";
		if(seats[i].talking){
			document.getElementById(""+seats[i].row+","+seats[i].col+"").className="danger";
			//document.getElementById(""+seats[i].row+","+seats[i].col+"").style.border="solid red";
		}
		else{
			console.log('safe	'+seats[i].row+ '		'+seats[i].col);
			document.getElementById(""+seats[i].row+","+seats[i].col+"").className="safe";
			//document.getElementById(""+seats[i].row+","+seats[i].col+"").style.backgroundColor="red";
			//document.getElementById(""+seats[i].row+","+seats[i].col+"").style.border="solid";
		}
	}
}
function ifButtonIsPressed(i,j)													//this function is loaded when the user clicks on any button while choosing seats for the new table
{
		// Book function
		console.log(document.getElementById(""+i+","+j+"").style.border);
		if(document.getElementById(""+i+","+j+"").style.border =="5px solid red"){
			document.getElementById(""+i+","+j+"").style.border="2px solid black";
			document.getElementById(""+i+","+j+"").style.bottom="0px";
		}
		else {
			console.log('Blue');
			document.getElementById(""+i+","+j+"").style.border="5px solid red";
			document.getElementById(""+i+","+j+"").style.position = "relative";
			document.getElementById(""+i+","+j+"").style.bottom="3px";
		}
}

function Book(){
	for(var i=1;i<=rows;i++){
			for(var j=1;j<=cols;j++){
				if(document.getElementById(""+i+","+j+"").style.border =="5px solid red"){
					if(checked == 'T')
						addPassenger(i,j,true);
					else {
						addPassenger(i,j,false);
					}
				}
			}
	}
}

function createTable()															//creates the table
{
	document.getElementById("table").innerHTML +="<p align='center'><br>";
	document.getElementById("table").innerHTML +="<table>";
	for(var i=1;i<=rows;i++){
			document.getElementById("table").innerHTML +="<tr>";
			for(var j=1;j<=cols;j++){
																				//creates a table with rows and cols defined by the user
				document.getElementById("table").innerHTML +="<td>";
				document.getElementById("table").innerHTML +="<button style='height:50px;width:50px; padding-top:12px; border:solid black; border-width:2px;' id='"+i+","+j+"' onClick='ifButtonIsPressed("+i+","+j+")'> </button>";
				document.getElementById("table").innerHTML +="</td>";
																				//creates a button with fixed size. When clicked, it loads ifButtonIsPress()
		    document.getElementById(""+i+","+j+"").style.backgroundColor ="white";
		}
		document.getElementById("table").innerHTML +="</tr><br>";
	}
	document.getElementById("table").innerHTML +="</table>";
	document.getElementById("table").innerHTML +="</p>";
}

function chooseArea()															//enables selected seats by the user and makes them visible
{

if(false)																//checks if seat orientation has noonot been modified
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


function removeRow(r){
	//console.log('Remove');
	for(var i=1;i<=cols;i++){												// this for loop is responsible for the columns of the table
			//console.log(r+'	'+i);
			document.getElementById(""+r+","+i+"").disabled =true;
			document.getElementById(""+r+","+i+"").style.visibility="hidden";
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
	checked='T';
	// for(var i=1; i<11; i++)
	// 	for(var j=1; j<21; j++)
	// 	{
	// 		//console.log (' outpt '+i +'		'+j+ '	'+M[i][j]);
	// 		document.getElementById(""+i+","+j+"").innerText=M[i][j];
	// 	}
		color(1);
}

function sleepPref(){
	console.log('TIME TO SLEEP');
	checked='S';
	//createMap();
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
					document.getElementById(""+i+","+j+"").style.backgroundColor="rgba(0,255,0,"+c+")";
				}
				else{
					c=1-M[i][j]/bomb;
					document.getElementById(""+i+","+j+"").style.backgroundColor="rgba(255,255,0,"+c+")";
				}
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
	//console.log(rows + '	' + cols);
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
	for(var i=1; i<rows; i++)
		for(var j=1; j<cols; j++){
			if(document.getElementById(""+i+","+j+"").className == "danger" && document.getElementById(""+i+","+j+"").style.visibility !="hidden")
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
				//console.log(q1.isEmpty() + '	'+q2.isEmpty());
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
		//console.log(d);
		d--;
		q1.dequeue();
		q1.enqueue(0);
	}
	map();
}

function Check(i,j){
	return (i >= 1) && (i <= rows) && (j >= 1) && (j <= cols) && (!V[i][j]);
}

function addPassenger(row, col, talking){
	var params = {
		row : row,
		col : col,
		talking : talking
	}
	$.post("http://35.160.243.26:8080/addPassenger?"+$.param(params),function(status)
	{
		console.log('adding passenger to cloud : '+status)
	});
}
