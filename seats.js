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
		document.getElementById(""+seats[i].row+","+seats[i].col+"").innerText="X";
		document.getElementById(""+seats[i].row+","+seats[i].col+"").style.fontSize = "100%";
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
function ifButtonIsPressed()													//this function is loaded when the user clicks on any button while choosing seats for the new table
{
		// Book function
		if(document.getElementById(this).style.border =="solid blue")
			document.getElementById(this).style.border"solid black";
		else {
			document.getElementById(this).style.background="solid blue";
		}
}

function Book(){
	for(var i=1;i<=rows;i++){
			for(var j=1;j<=cols;j++){
				if(document.getElementById(this).style.border =="solid blue"){
					//Send the seat data
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
				document.getElementById("table").innerHTML +="<button style='height:50px;width:50px;padding-top:30px; border:solid black;' id='"+i+","+j+"' onClick='combine("+(""+i+","+j+"")+");ifButtonIsPressed();'> </button>";
				document.getElementById("table").innerHTML +="</td>";
																				//creates a button with fixed size. When clicked, it loads ifButtonIsPress()
		    document.getElementById(""+i+","+j+"").style.backgroundColor ="white";
		}
		document.getElementById("table").innerHTML +="</tr><br>";
	}
	document.getElementById("table").innerHTML +="</table>";
	document.getElementById("table").innerHTML +="</p>";
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
