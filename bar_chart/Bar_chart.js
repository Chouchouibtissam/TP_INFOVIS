var colors ={"Fumeur": "#807dba",
"Nonfumeur": "#6a51a3",
"homme": "#dd3497",
"femme": "#f768a1",
"age18_age19":"#f16913",
"age20_age29":"#fd8d3c",
"age30_age39":"#fdae6b ",
"ageS40":"#fdd0a2",
"Pasdactivityphysique": "#7fcdbb",
"SPlus10": "#c7e9b4",
"Huileveg": "#084594",
"Zitziton": "#2171b5",
"Margarine": "#4292c6",
"Beurre": '#6baed6',
"autre": "#9ecae1"
}

const height = 500
const width = 1200
const margin = {top : 50 , right : 50 , bottom : 50 , left : 50}

function zoom(svg) {
  const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];

  svg.call(d3.zoom()
      .scaleExtent([1, 14])
      .translateExtent(extent)
      .extent(extent)
      .on("zoom", zoomed));

  function zoomed(event) {
    x.rangeRound([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
    console.log(x.bandwidth());
    svg.selectAll(".bars rect").attr("x", (d,i) => x(i)).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars-2 rect").attr("x", (d,i) => x(i)).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars2 rect").attr("x", (d,i) => x(i)+x.bandwidth()/4).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars2-2 rect").attr("x", (d,i) => x(i)+x.bandwidth()/4).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars3 rect").attr("x", (d,i) => x(i)+2*x.bandwidth()/4).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars3-2 rect").attr("x", (d,i) => x(i)+2*x.bandwidth()/4).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars3-3 rect").attr("x", (d,i) => x(i)+2*x.bandwidth()/4).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars3-4 rect").attr("x", (d,i) => x(i)+2*x.bandwidth()/4).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars4 rect").attr("x", (d,i) => x(i)+3*x.bandwidth()/4).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars4-2 rect").attr("x", (d,i) => x(i)+3*x.bandwidth()/4).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars5 rect").attr("x", (d,i) => x(i)+4*x.bandwidth()/4).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars5-2 rect").attr("x", (d,i) => x(i)+4*x.bandwidth()/4).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars5-3 rect").attr("x", (d,i) => x(i)+4*x.bandwidth()/4).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars5-4 rect").attr("x", (d,i) => x(i)+4*x.bandwidth()/4).attr("width", x.bandwidth()/4);
    svg.selectAll(".bars5-5 rect").attr("x", (d,i) => x(i)+4*x.bandwidth()/4).attr("width", x.bandwidth()/4);
    svg.selectAll(".x-axis").call(xAxis);
  }
}

var svg = d3.select("#chart_container").append("svg")
                                       .attr("width", width -50 )
                                       .attr("height", height)
                                       .attr("viewBox", [0, 0, width, height])      
                                       .attr("class" , "chart")
                                       .call(zoom);

var x = d3.scaleBand().domain(d3.range(data.length)).rangeRound([margin.left, width - margin.right]).paddingInner(0.3).paddingOuter(0.2),
y = d3.scaleLinear().domain([0,60]).rangeRound([height, 80]);
                                  
function xAxis(g){
  g.attr('transform', `translate(0 , ${height -50})`).call(d3.axisBottom(x).tickFormat(i => data[i].Maladies))
}
function yAxis(g){
  g.attr('transform', 'translate(50 ,-50)').attr('font-size' , '20px').call(d3.axisLeft(y).ticks( null , data.format))
}

var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);



//--------------------- variable  1 " Fumeur / Non fumeur" ---------------------------------------------------------------
var fumeur = svg.append('g')
               .attr('fill' , colors.Fumeur)
               .attr("class", "bars")
              .selectAll('rect')
              .data(data)
              .join('rect')
              .attr('x', (d ,i) => x(i))
              .attr('y', (d) => (y(0) -50) )
              .attr('height' , 0)
              .attr('width', x.bandwidth()/4)
   

fumeur.on("mouseover", function(d , i) {		
  div.transition()		
      .duration(200)		
      .style("opacity", .9);		
  div	.html("Fumeurs pour " + i.Maladies + "<br/>"  + (i.Fumeur * 100).toFixed(2) + "%")	
      .style("left", (d.pageX + 20) + "px")		
      .style("top", (d.pageY - 28) + "px");	
  })					
.on("mouseout", function(d) {		
  div.transition()		
      .duration(500)		
      .style("opacity", 0);	
}) 
.transition()
.attr('y', (d) => (y(d.Fumeur*100) -50 - (y(0) - y(d.Nonfumeur*100))) )
.attr('height' , (d) => y(0) - y(d.Fumeur*100) );



var non_fumeur =svg.append('g')
  .attr('fill' , colors.Nonfumeur)
  .attr("class", "bars-2")
  .selectAll('rect')
  .data(data)
  .join('rect')
    .attr('x', (d ,i) => x(i))
    .attr('y', (d) => (y(0) -50) )
    
    .attr('height' , 0)
    .attr('width', x.bandwidth()/4)
non_fumeur .on("mouseover", function(d , i) {		
  div.transition()		
      .duration(200)		
      .style("opacity", .9);		
  div	.html("Non Fumeurs pour " + i.Maladies + "<br/>"  + (i.Nonfumeur * 100).toFixed(2)+ "%")	
      .style("left", (d.pageX + 20) + "px")		
      .style("top", (d.pageY - 28) + "px");	
  })					
.on("mouseout", function(d) {		
  div.transition()		
      .duration(500)		
      .style("opacity", 0);	
})
.transition()
.attr('y', (d) => (y(d.Nonfumeur*100) -50) )
    .attr('height' , (d) => y(0) - y(d.Nonfumeur*100));



 //--------------------- variable 2 " Sexe " --------------------------------------------------------------------
 var p_femme = svg.append('g')
                  .attr('fill' , colors.femme)
                  .attr("class", "bars2")
                  .selectAll('rect')
                  .data(data)
                  .join('rect')
                  .attr('x', (d ,i) => x(i)+x.bandwidth()/4)
                  .attr('y', (d) => (y(0) -50 ) )
                  .attr('height' , 0)
                  .attr('width', x.bandwidth()/4)
p_femme.on("mouseover", function(d , i) {		
 div.transition()		
     .duration(200)		
     .style("opacity", .9);		
 div	.html("Les femmes pour " + i.Maladies + "<br/>"  + (i.femme * 100).toFixed(2) + "%")	
     .style("left", (d.pageX + 20) + "px")		
     .style("top", (d.pageY - 28) + "px");	
 })					
.on("mouseout", function(d) {		
 div.transition()		
     .duration(500)		
     .style("opacity", 0);	
})
.transition()
.attr('y', (d) => (y(d.femme*100) -50 - (y(0) - y(d.homme*100))) )
   .attr('height' , (d) => y(0) - y(d.femme*100) );



var p_homme  =svg.append('g')
                .attr('fill' , colors.homme)
                .attr("class", "bars2-2")
                .selectAll('rect')
                .data(data)
                .join('rect')
                .attr('x', (d ,i) => x(i)+x.bandwidth()/4)
                .attr('y', (d) => (y(0) -50) )
                .attr('height' , 0)
                .attr('width', x.bandwidth()/4)
                


p_homme.on("mouseover", function(d , i) {		
 div.transition()		
     .duration(200)		
     .style("opacity", .9);		
 div.html("Les hommes pour " + i.Maladies + "<br/>"  + (i.homme * 100).toFixed(2) + "%")	
     .style("left", (d.pageX + 20) + "px")		
     .style("top", (d.pageY - 28) + "px");	
 })					
.on("mouseout", function(d) {		
 div.transition()		
     .duration(500)		
     .style("opacity", 0);	
})
.transition()
.attr('y', (d) => (y(d.homme*100) -50) )
   .attr('height' , (d) => y(0) - y(d.homme*100));



    


 //--------------------- variable  3 " L'age " -------------------

 var age_1 = svg.append('g')
                .attr('fill' , colors.age18_age19)
                .attr("class", "bars3")
                .selectAll('rect')
                .data(data)
                .join('rect')
                .attr('x', (d ,i) => x(i)+2*x.bandwidth()/4)
                .attr('y', (d) => (y(0) -50 ) )
                .attr('height' , 0)
                .attr('width', x.bandwidth()/4)
age_1.on("mouseover", function(d , i) {		
 div.transition()		
     .duration(200)		
     .style("opacity", .9);		
 div	.html("Age entre 18 et 20ans pour " + i.Maladies + "<br/>"  + (i.age18_age19 * 100).toFixed(2) + "%")	
     .style("left", (d.pageX + 20) + "px")		
     .style("top", (d.pageY - 28) + "px");	
 })					
.on("mouseout", function(d) {		
 div.transition()		
     .duration(500)		
     .style("opacity", 0);	
})
.transition()
 .attr('y', (d) => (y(d.age18_age19*100) -50 - (y(0) - y(d.age20_age29*100))- (y(0) - y(d.age30_age39*100))- (y(0) - y(d. ageS40*100))) )
 .attr('height' , (d) => y(0) - y(d.age18_age19*100) );



var age_2 = svg.append('g')
              .attr('fill' , colors.age20_age29)
              .attr("class", "bars3-2")
              .selectAll('rect')
              .data(data)
              .join('rect')
              .attr('x', (d ,i) => x(i)+2*x.bandwidth()/4)
              .attr('y', (d) => (y(0) -50) )
              .attr('height' , 0)
              .attr('width', x.bandwidth()/4)
   

age_2.on("mouseover", function(d , i) {		
 div.transition()		
     .duration(200)		
     .style("opacity", .9);		
 div	.html("Age entre 20 et 29ans pour " + i.Maladies + "<br/>"  + (i.age20_age29 * 100).toFixed(2) + "%")	
     .style("left", (d.pageX + 20) + "px")		
     .style("top", (d.pageY - 28) + "px");	
 })					
.on("mouseout", function(d) {		
 div.transition()		
     .duration(500)		
     .style("opacity", 0);	
})
.transition()
.attr('y', (d) => (y(d.age20_age29*100) -50 - (y(0) - y(d.age30_age39*100)) - (y(0) - y(d.ageS40*100))) )
   .attr('height' , (d) => y(0) - y(d.age20_age29*100));


var age_3 = svg.append('g')
               .attr('fill' , colors.age30_age39)
               .attr("class", "bars3-3")
               .selectAll('rect')
               .data(data)
               .join('rect')
              .attr('x', (d ,i) => x(i)+2*x.bandwidth()/4)
              .attr('y', (d) => (y(0) -50) )
              .attr('height' , 0)
              .attr('width', x.bandwidth()/4)
   

age_3.on("mouseover", function(d , i) {		
 div.transition()		
     .duration(200)		
     .style("opacity", .9);		
 div	.html("Age entre 30 et 39ans pour " + i.Maladies + "<br/>"  + (i.age30_age39 * 100).toFixed(2) + "%")	
     .style("left", (d.pageX + 20) + "px")		
     .style("top", (d.pageY - 28) + "px");	
 })					
.on("mouseout", function(d) {		
 div.transition()		
     .duration(500)		
     .style("opacity", 0);	
})
.transition()
.attr('y', (d) => (y(d.age30_age39*100) -50 - (y(0) - y(d.ageS40*100))) )
   .attr('height' , (d) => y(0) - y(d.age30_age39*100));


var age_4 = svg.append('g')
              .attr('fill' , colors.ageS40)
              .attr("class", "bars3-4")
              .selectAll('rect')
              .data(data)
              .join('rect')
              .attr('x', (d ,i) => x(i)+2*x.bandwidth()/4)
              .attr('y', (d) => (y(0) -50 ) )
              .attr('height' , 0 )
              .attr('width', x.bandwidth()/4)

age_4.on("mouseover", function(d , i) {		
 div.transition()		
     .duration(200)		
     .style("opacity", .9);		
 div	.html("Age >40 pour " + i.Maladies + "<br/>"  + (i.ageS40 * 100).toFixed(2) + "%")	
     .style("left", (d.pageX + 20) + "px")		
     .style("top", (d.pageY - 28) + "px");	
 })					
.on("mouseout", function(d) {		
 div.transition()		
     .duration(500)		
     .style("opacity", 0);	
})
.transition()
.attr('y', (d) => (y(d.ageS40*100) -50) )
   .attr('height' , (d) => y(0) - y(d.ageS40*100) );



     //--------------------- variable  4 " Activité physique " -------------------


var s_plus = svg.append('g')
                .attr('fill' , colors.SPlus10)
                .attr("class", "bars4")
                .selectAll('rect')
                .data(data)
                .join('rect')
                .attr('x', (d ,i) => x(i)+3*x.bandwidth()/4)
                .attr('y', (d) => (y(0) -50 ) )
                .attr('height' , 0 )
                .attr('width', x.bandwidth()/4)
  
s_plus.on("mouseover", function(d , i) {		
div.transition()		
  .duration(200)		
  .style("opacity", .9);		
div	.html("Activité physique +10min pour " + i.Maladies + "<br/>"  + (i.SPlus10 * 100).toFixed(2)+ "%")	
  .style("left", (d.pageX + 20) + "px")		
  .style("top", (d.pageY - 28) + "px");	
})					
.on("mouseout", function(d) {		
div.transition()		
  .duration(500)		
  .style("opacity", 0);	
})
.transition()
.attr('y', (d) => (y(d.SPlus10*100) -50 - ((y(0) - y(d.Pasdactivityphysique*100)))) )
.attr('height' , (d) => y(0) - y(d.SPlus10*100) );



var pas_activity = svg.append('g')
                      .attr('fill' , colors.Pasdactivityphysique)
                      .attr("class", "bars4-2")
                      .selectAll('rect')
                      .data(data)
                      .join('rect')
                      .attr('x', (d ,i) => x(i)+3*x.bandwidth()/4)
                      .attr('y', (d) => (y(0) -50 )) 
                      .attr('height' , 0 )
                      .attr('width', x.bandwidth()/4)
pas_activity .on("mouseover", function(d , i) {		
div.transition()		
  .duration(200)		
  .style("opacity", .9);		
div	.html("Pas d'activité physique pour " + i.Maladies + "<br/>"  + (i.Pasdactivityphysique * 100).toFixed(2)+ "%")	
  .style("left", (d.pageX + 20) + "px")		
  .style("top", (d.pageY - 28) + "px");	
})					
.on("mouseout", function(d) {		
div.transition()		
  .duration(500)		
  .style("opacity", 0);	
})
.transition()
.attr('y', (d) => (y(d.Pasdactivityphysique*100) -50 )) 
  .attr('height' , (d) => y(0) - y(d.Pasdactivityphysique*100) ); 


 

    

  //--------------------- variable  5 " La matière grasse " -------------------
var autre_v = svg.append('g')
                .attr('fill' , colors.autre)
                .attr("class", "bars5")
                .selectAll('rect')
                .data(data)
                .join('rect')
                .attr('x', (d ,i) => x(i)+4*x.bandwidth()/4)
                .attr('y', (d) => (y(0) -50 ) )
                .attr('height' , 0)
                .attr('width', x.bandwidth()/4)
autre_v.on("mouseover", function(d , i) {		
  div.transition()		
      .duration(200)		
      .style("opacity", .9);		
  div	.html("Autre pour " + i.Maladies + "<br/>"  + (i.autre * 100).toFixed(2)  + "%")	
      .style("left", (d.pageX + 20) + "px")		
      .style("top", (d.pageY - 28) + "px");	
  })					
.on("mouseout", function(d) {		
  div.transition()		
      .duration(500)		
      .style("opacity", 0);	
})
.transition()
  .attr('y', (d) => (y(d.autre*100) -50 - (y(0) - y(d.Huileveg*100))- (y(0) - y(d.Margarine*100))- (y(0) - y(d.Zitziton*100))- (y(0) - y(d.Beurre*100))) )
  .attr('height' , (d) => y(0) - y(d.autre*100) );



var beurre_v = svg.append('g')
                  .attr('fill' , colors.Beurre)
                  .attr("class", "bars5-2")
                  .selectAll('rect')
                  .data(data)
                  .join('rect')
                  .attr('x', (d ,i) => x(i)+4*x.bandwidth()/4)
                  .attr('y', (d) => (y(0) -50) )
                  .attr('height' , 0)
                  .attr('width', x.bandwidth()/4)
    

beurre_v.on("mouseover", function(d , i) {		
  div.transition()		
      .duration(200)		
      .style("opacity", .9);		
  div	.html("Beurre pour " + i.Maladies + "<br/>"  + (i.Beurre * 100).toFixed(2) + "%")	
      .style("left", (d.pageX + 20) + "px")		
      .style("top", (d.pageY - 28) + "px");	
  })					
.on("mouseout", function(d) {		
  div.transition()		
      .duration(500)		
      .style("opacity", 0);	
})
.transition()
.attr('y', (d) => (y(d.Beurre*100) -50 - (y(0) - y(d.Huileveg*100)) - (y(0) - y(d.Margarine*100)) - (y(0) - y(d.Zitziton*100))) )
    .attr('height' , (d) => y(0) - y(d.Beurre*100));


var marg = svg.append('g')
              .attr('fill' , colors.Margarine)
              .attr("class", "bars5-3")
              .selectAll('rect')
              .data(data)
              .join('rect')
              .attr('x', (d ,i) => x(i)+4*x.bandwidth()/4)
              .attr('y', (d) => (y(0) -50) )
              .attr('height' , 0)
              .attr('width', x.bandwidth()/4)
              

marg .on("mouseover", function(d , i) {		
  div.transition()		
      .duration(200)		
      .style("opacity", .9);		
  div	.html("Margarine pour " + i.Maladies + "<br/>"  + (i.Margarine * 100).toFixed(2) + "%")	
      .style("left", (d.pageX + 20) + "px")		
      .style("top", (d.pageY - 28) + "px");	
  })					
.on("mouseout", function(d) {		
  div.transition()		
      .duration(500)		
      .style("opacity", 0);	
})
.transition()
.attr('y', (d) => (y(d.Margarine*100) -50 - (y(0) - y(d.Huileveg*100))- (y(0) - y(d.Zitziton*100))) )
    .attr('height' , (d) => y(0) - y(d.Margarine*100));


var zit = svg.append('g')
            .attr('fill' , colors.Zitziton)
            .attr("class", "bars5-4")
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', (d ,i) => x(i)+4*x.bandwidth()/4)
            .attr('y', (d) => (y(0) -50 ) )
            .attr('height' , 0 )
            .attr('width', x.bandwidth()/4)

zit.on("mouseover", function(d , i) {		
  div.transition()		
      .duration(200)		
      .style("opacity", .9);		
  div	.html("Zit Zitoun pour " + i.Maladies + "<br/>"  + (i.Zitziton * 100).toFixed(2) + "%")	
      .style("left", (d.pageX + 20) + "px")		
      .style("top", (d.pageY - 28) + "px");	
  })					
.on("mouseout", function(d) {		
  div.transition()		
      .duration(500)		
      .style("opacity", 0);	
})
.transition()
.attr('y', (d) => (y(d.Zitziton*100) -50 - (y(0) - y(d.Huileveg*100))) )
    .attr('height' , (d) => y(0) - y(d.Zitziton*100) );

var huile =svg.append('g')
              .attr('fill' , colors.Huileveg)
              .attr("class", "bars5-5")
              .selectAll('rect')
              .data(data)
              .join('rect')
              .attr('x', (d ,i) => x(i)+4*x.bandwidth()/4)
              .attr('y', (d) => (y(0) -50) )
              .attr('height' , 0)
              .attr('width', x.bandwidth()/4)
    
huile.on("mouseover", function(d , i) {		
  div.transition()		
      .duration(200)		
      .style("opacity", .9);		
  div	.html("Huile végétale pour " + i.Maladies + "<br/>"  + (i.Huileveg * 100).toFixed(2) + "%")	
      .style("left", (d.pageX + 20) + "px")		
      .style("top", (d.pageY - 28) + "px");	
  })					
.on("mouseout", function(d) {		
  div.transition()		
      .duration(500)		
      .style("opacity", 0);	
})
.transition()
.attr('y', (d) => (y(d.Huileveg*100) -50) )
    .attr('height' , (d) => y(0) - y(d.Huileveg*100));






   

svg.append('g').attr("class", "axis").attr("class", "x-axis").call(xAxis)
svg.append('g').attr("class", "axis").call(yAxis)
var text3= svg.append("text")
              .style("fill", "black")
              .style("font-size", "23px")
              .attr("text-anchor", "end")
              .attr("transform", `translate(${width - 20},${height}) rotate(0)`)
              .text("Maladies");

var text3= svg.append("text")
              .style("fill", "black")
              .style("font-size", "23px")
              .attr("text-anchor", "end")
              .attr("transform", "translate(220 , 30) rotate(0)")
              .text("Pourcentage %");

svg.node()



