	document.body.background="pic4.jpg";
	var canvas,context,canvaso,contexto;
	canvas=document.getElementById("canvas");
        context=document.getElementById("canvas2");
        width=canvas.width;
        height=canvas.height;
        canvaso=canvas.getContext("2d");
        contexto=context.getContext("2d");

	function new_tool(selected){ tool=selected; }
	var fill=false;
	var stroke=true;
	function elements(){
		if (document.getElementById("fill").checked)
			fill=true;
		else
			fill=false;
		if (document.getElementById("boarder").checked)
			stroke=true;
		else
			stroke=false;
	}
	function clears(){
		canvaso.clearRect(0,0,width,height);
	}
	function color(pic){
		contexto.strokeStyle=pic;
		if (document.getElementById("fill").checked)
			contexto.fillStyle=pic;
	}
	var x,y;
	var hold=false;
	context.onmousedown=function(e) {
		elements();
        	x=e.layerX;
        	y=e.layerY;
        	hold=true;
        	startx=x;
        	starty=y;
        	contexto.beginPath();
        	contexto.moveTo(startx,starty);
	}
	context.onmousemove=function(e) {
        	if (x==null || y==null) {
          		return;
        	}
        	if(hold){
        		x=e.layerX;
        		y=e.layerY;
        		Draw();
        	}
	}
  	context.onmouseup=function(e) {
        	canvaso.drawImage(context,0,0);
        	contexto.clearRect(0,0,context.width,context.height);
        	x=null;
        	y=null;
        	hold=false;
	}
	function Draw(){
		if (tool=='rectangle'){
			contexto.clearRect(0,0,width,height);
			if(stroke)
				contexto.strokeRect(startx,starty,x-startx,y-starty);
			if(fill)
				contexto.fillRect(startx,starty,x-startx,y-starty);
		}
		else if (tool=='circle'){
			contexto.clearRect(0,0,width,height);
			contexto.beginPath();
			contexto.arc(startx,starty,Math.abs(y-starty),0,2*Math.PI,false);
			if(stroke)
				contexto.stroke();
			if(fill)
				contexto.fill();
		}
		else if (tool=='line'){
			contexto.clearRect(0,0,width,height);
			contexto.beginPath();
			contexto.moveTo(startx,starty);
			contexto.lineTo(x,y)
			contexto.closePath();
			if(stroke)
				contexto.stroke();
		}
		else if (tool=='pencil'){
			contexto.clearRect(0,0,width,height);
			contexto.moveTo(x,y);
			contexto.lineTo(x+2,y+2);
			contexto.lineWidth=2;
			if(stroke)
                                contexto.stroke();
                        if(fill)
                                contexto.fill();
		}
	}
