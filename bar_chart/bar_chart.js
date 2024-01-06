var colors = {
  "Fumeur": "#807dba",
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

var x = d3.scaleBand().domain(d3.range(data.length)).rangeRound([margin.left, width - margin.right]).paddingInner(0.3).paddingOuter(0.2)
var y = d3.scaleLinear([0, 60],[height, 80]);
var vars_count = 5; // Nombre de variables actives
var vars_starts = [...Array(vars_count).keys()].map((e) => e * x.bandwidth()/vars_count) // Initialiser la position de début des variables
// ========= filtres par défaut =========
var fumer_checked = d3.select("#fumer").property("checked");
var sexe_checked = d3.select("#sexe").property("checked");
var age_checked = d3.select("#age").property("checked");
var activite_physique_checked = d3.select("#activite_physique").property("checked");
var huile_checked = d3.select("#huile").property("checked");
// ======================================
var zoom_x_instance; // controlleur du zoom sur l'axe X
var zoom_y_instance; // controlleur du zoom sur l'axe Y
const zoom_extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];

// ================================ Graphical elements ===================================================================

var svg = d3.select("#chart_container").append("svg")
                                       .attr("width", width -50)
                                       .attr("height", height)
                                       .attr("viewBox", [0, 0, width, height])      
                                       .attr("class" , "chart")
                                       .call(zoom_x);
                                  
function xAxis(g){
  g.attr('transform', `translate(0 , ${height - margin.bottom})`).call(d3.axisBottom(x).tickFormat(i => data[i].Maladies));
}
function yAxis(g){
  g.attr('transform', 'translate(50 ,-50)').call(d3.axisLeft(y).ticks( null , data.format));
}

var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);



//--------------------- variable  1 " Fumeur / Non fumeur" ---------------------------------------------------------------
var fumeur = svg.append('g')
               .attr('fill' , colors.Fumeur)
               .attr("class", "gen_bars bars")
              .selectAll('rect')
              .data(data)
              .join('rect')
              .attr('x', (d ,i) => x(i))
              .attr('y', (d) => (y(0) - margin.bottom) )
              .attr('height' , 0)
              .attr('width', x.bandwidth()/vars_count)
   

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
.attr('y', (d) => (y(d.Fumeur*100) - margin.bottom - (y(0) - y(d.Nonfumeur*100))) )
.attr('height' , (d) => y(0) - y(d.Fumeur*100) );



var non_fumeur =svg.append('g')
  .attr('fill' , colors.Nonfumeur)
  .attr("class", "gen_bars bars-2")
  .selectAll('rect')
  .data(data)
  .join('rect')
    .attr('x', (d ,i) => x(i))
    .attr('y', (d) => (y(0) - margin.bottom) )
    .attr('height' , 0)
    .attr('width', x.bandwidth()/vars_count)
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
.attr('y', (d) => (y(d.Nonfumeur*100) - margin.bottom) )
    .attr('height' , (d) => y(0) - y(d.Nonfumeur*100));



 //--------------------- variable 2 " Sexe " --------------------------------------------------------------------
 var p_femme = svg.append('g')
                  .attr('fill' , colors.femme)
                  .attr("class", "gen_bars bars2")
                  .selectAll('rect')
                  .data(data)
                  .join('rect')
                  .attr('x', (d ,i) => x(i)+x.bandwidth()/vars_count)
                  .attr('y', (d) => (y(0) - margin.bottom) )
                  .attr('height' , 0)
                  .attr('width', x.bandwidth()/vars_count)
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
.attr('y', (d) => (y(d.femme*100) - margin.bottom - (y(0) - y(d.homme*100))) )
   .attr('height' , (d) => y(0) - y(d.femme*100) );



var p_homme = svg.append('g')
                .attr('fill' , colors.homme)
                .attr("class", "gen_bars bars2-2")
                .selectAll('rect')
                .data(data)
                .join('rect')
                .attr('x', (d ,i) => x(i)+x.bandwidth()/vars_count)
                .attr('y', (d) => (y(0) - margin.bottom) )
                .attr('height' , 0)
                .attr('width', x.bandwidth()/vars_count)
                


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
.attr('y', (d) => (y(d.homme*100) - margin.bottom) )
   .attr('height' , (d) => y(0) - y(d.homme*100));



    


 //--------------------- variable  3 " L'age " -------------------

 var age_1 = svg.append('g')
                .attr('fill' , colors.age18_age19)
                .attr("class", "gen_bars bars3")
                .selectAll('rect')
                .data(data)
                .join('rect')
                .attr('x', (d ,i) => x(i)+2*x.bandwidth()/vars_count)
                .attr('y', (d) => (y(0) - margin.bottom) )
                .attr('height' , 0)
                .attr('width', x.bandwidth()/vars_count)
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
 .attr('y', (d) => (y(d.age18_age19*100) - margin.bottom - (y(0) - y(d.age20_age29*100))- (y(0) - y(d.age30_age39*100))- (y(0) - y(d. ageS40*100))) )
 .attr('height' , (d) => y(0) - y(d.age18_age19*100) );



var age_2 = svg.append('g')
              .attr('fill' , colors.age20_age29)
              .attr("class", "gen_bars bars3-2")
              .selectAll('rect')
              .data(data)
              .join('rect')
              .attr('x', (d ,i) => x(i)+2*x.bandwidth()/vars_count)
              .attr('y', (d) => (y(0) - margin.bottom) )
              .attr('height' , 0)
              .attr('width', x.bandwidth()/vars_count)
   

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
.attr('y', (d) => (y(d.age20_age29*100) - margin.bottom - (y(0) - y(d.age30_age39*100)) - (y(0) - y(d.ageS40*100))) )
   .attr('height' , (d) => y(0) - y(d.age20_age29*100));


var age_3 = svg.append('g')
               .attr('fill' , colors.age30_age39)
               .attr("class", "gen_bars bars3-3")
               .selectAll('rect')
               .data(data)
               .join('rect')
              .attr('x', (d ,i) => x(i)+2*x.bandwidth()/vars_count)
              .attr('y', (d) => (y(0) - margin.bottom) )
              .attr('height' , 0)
              .attr('width', x.bandwidth()/vars_count)
   

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
.attr('y', (d) => (y(d.age30_age39*100) - margin.bottom - (y(0) - y(d.ageS40*100))) )
   .attr('height' , (d) => y(0) - y(d.age30_age39*100));


var age_4 = svg.append('g')
              .attr('fill' , colors.ageS40)
              .attr("class", "gen_bars bars3-4")
              .selectAll('rect')
              .data(data)
              .join('rect')
              .attr('x', (d ,i) => x(i)+2*x.bandwidth()/vars_count)
              .attr('y', (d) => (y(0) - margin.bottom) )
              .attr('height' , 0 )
              .attr('width', x.bandwidth()/vars_count)

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
.attr('y', (d) => (y(d.ageS40*100) - margin.bottom) )
   .attr('height' , (d) => y(0) - y(d.ageS40*100) );



//--------------------- variable  4 " Activité physique " -------------------


var s_plus = svg.append('g')
                .attr('fill' , colors.SPlus10)
                .attr("class", "gen_bars bars4")
                .selectAll('rect')
                .data(data)
                .join('rect')
                .attr('x', (d ,i) => x(i)+3*x.bandwidth()/vars_count)
                .attr('y', (d) => (y(0) - margin.bottom) )
                .attr('height' , 0 )
                .attr('width', x.bandwidth()/vars_count)
  
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
.attr('y', (d) => (y(d.SPlus10*100) - margin.bottom - ((y(0) - y(d.Pasdactivityphysique*100)))) )
.attr('height' , (d) => y(0) - y(d.SPlus10*100) );



var pas_activity = svg.append('g')
                      .attr('fill' , colors.Pasdactivityphysique)
                      .attr("class", "gen_bars bars4-2")
                      .selectAll('rect')
                      .data(data)
                      .join('rect')
                      .attr('x', (d ,i) => x(i)+3*x.bandwidth()/vars_count)
                      .attr('y', (d) => (y(0) - margin.bottom)) 
                      .attr('height' , 0 )
                      .attr('width', x.bandwidth()/vars_count)
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
.attr('y', (d) => (y(d.Pasdactivityphysique*100) - margin.bottom)) 
  .attr('height' , (d) => y(0) - y(d.Pasdactivityphysique*100) ); 


 

    

  //--------------------- variable  5 " Huile " -------------------
var autre_v = svg.append('g')
                .attr('fill' , colors.autre)
                .attr("class", "gen_bars bars5")
                .selectAll('rect')
                .data(data)
                .join('rect')
                .attr('x', (d ,i) => x(i)+4*x.bandwidth()/vars_count)
                .attr('y', (d) => (y(0) - margin.bottom) )
                .attr('height' , 0)
                .attr('width', x.bandwidth()/vars_count)
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
  .attr('y', (d) => (y(d.autre*100) - margin.bottom - (y(0) - y(d.Huileveg*100))- (y(0) - y(d.Margarine*100))- (y(0) - y(d.Zitziton*100))- (y(0) - y(d.Beurre*100))) )
  .attr('height' , (d) => y(0) - y(d.autre*100) );



var beurre_v = svg.append('g')
                  .attr('fill' , colors.Beurre)
                  .attr("class", "gen_bars bars5-2")
                  .selectAll('rect')
                  .data(data)
                  .join('rect')
                  .attr('x', (d ,i) => x(i)+4*x.bandwidth()/vars_count)
                  .attr('y', (d) => (y(0) - margin.bottom) )
                  .attr('height' , 0)
                  .attr('width', x.bandwidth()/vars_count)
    

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
.attr('y', (d) => (y(d.Beurre*100) - margin.bottom - (y(0) - y(d.Huileveg*100)) - (y(0) - y(d.Margarine*100)) - (y(0) - y(d.Zitziton*100))) )
    .attr('height' , (d) => y(0) - y(d.Beurre*100));


var marg = svg.append('g')
              .attr('fill' , colors.Margarine)
              .attr("class", "gen_bars bars5-3")
              .selectAll('rect')
              .data(data)
              .join('rect')
              .attr('x', (d ,i) => x(i)+4*x.bandwidth()/vars_count)
              .attr('y', (d) => (y(0) - margin.bottom) )
              .attr('height' , 0)
              .attr('width', x.bandwidth()/vars_count)
              

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
.attr('y', (d) => (y(d.Margarine*100) - margin.bottom - (y(0) - y(d.Huileveg*100))- (y(0) - y(d.Zitziton*100))) )
    .attr('height' , (d) => y(0) - y(d.Margarine*100));


var zit = svg.append('g')
            .attr('fill' , colors.Zitziton)
            .attr("class", "gen_bars bars5-4")
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', (d ,i) => x(i)+4*x.bandwidth()/vars_count)
            .attr('y', (d) => (y(0) - margin.bottom) )
            .attr('height' , 0 )
            .attr('width', x.bandwidth()/vars_count)

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
.attr('y', (d) => (y(d.Zitziton*100) - margin.bottom - (y(0) - y(d.Huileveg*100))) )
    .attr('height' , (d) => y(0) - y(d.Zitziton*100) );

var huile = svg.append('g')
              .attr('fill' , colors.Huileveg)
              .attr("class", "gen_bars bars5-5")
              .selectAll('rect')
              .data(data)
              .join('rect')
              .attr('x', (d ,i) => x(i)+4*x.bandwidth()/vars_count)
              .attr('y', (d) => (y(0) - margin.bottom) )
              .attr('height' , 0)
              .attr('width', x.bandwidth()/vars_count)
    
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
.attr('y', (d) => (y(d.Huileveg*100) - margin.bottom) )
    .attr('height' , (d) => y(0) - y(d.Huileveg*100));


// =================================== Axes ==========================================

svg.append('g').attr("class", "axis").attr("class", "x-axis").call(xAxis)
svg.append('g').attr("class", "axis").attr("class", "y-axis").call(yAxis)
var text3 = svg.append("text")
              .style("fill", "black")
              .style("font-size", "23px")
              .attr("text-anchor", "end")
              .attr("transform", `translate(${width - 20},${height}) rotate(0)`)
              .text("Maladies");

var text3 = svg.append("text")
              .style("fill", "black")
              .style("font-size", "23px")
              .attr("text-anchor", "end")
              .attr("transform", "translate(220 , 30) rotate(0)")
              .text("Pourcentage %");

// ================================== Utils functions =================================
function calculateVarStarts(){

  vars_count = fumer_checked + sexe_checked + age_checked + activite_physique_checked + huile_checked;

  let var_start = 0;

  // ============ Fumer ===================
  if(fumer_checked){
    vars_starts[0] = var_start;
    var_start += x.bandwidth()/vars_count;
  }

  // ============ Sexe ==================
  if(sexe_checked){
    vars_starts[1] = var_start;
    var_start += x.bandwidth()/vars_count;
  }

  // ================ Age ========================
  if(age_checked){
    vars_starts[2] = var_start;
    var_start += x.bandwidth()/vars_count;
  }

  // ================ Activité physique ========================
  if(activite_physique_checked){
    vars_starts[3] = var_start;
    var_start += x.bandwidth()/vars_count;
  }

  // ================ Huile ========================
  if(huile_checked){
    vars_starts[4] = var_start;
    var_start += x.bandwidth()/vars_count;
  }
}

// =================================== Filtering =======================================

// Transition size and position of vars according to vars_count
function filterVars(){
  fumer_checked = d3.select("#fumer").property("checked");
  sexe_checked = d3.select("#sexe").property("checked");
  age_checked = d3.select("#age").property("checked");
  activite_physique_checked = d3.select("#activite_physique").property("checked");
  huile_checked = d3.select("#huile").property("checked");

  vars_count = fumer_checked + sexe_checked + age_checked + activite_physique_checked + huile_checked;

  let var_start = 0;

  // ============ Fumer ===================
  if(fumer_checked){
    svg.selectAll(".bars rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    svg.selectAll(".bars-2 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    var_start = parseInt(svg.select(".bars rect").attr("x")) + x.bandwidth()/vars_count - x(0);
    vars_starts[0] = var_start;
  }
  else{
    svg.selectAll(".bars rect").attr("width", 0);
    svg.selectAll(".bars-2 rect").attr("width", 0);
  }

  // ============ Sexe ==================
  if(sexe_checked){
    svg.selectAll(".bars2 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    svg.selectAll(".bars2-2 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    var_start = parseInt(svg.select(".bars2 rect").attr("x")) + x.bandwidth()/vars_count - x(0);
    vars_starts[1] = var_start;
  }
  else{
    svg.selectAll(".bars2 rect").attr("width", 0);
    svg.selectAll(".bars2-2 rect").attr("width", 0);
  }

  // ================ Age ========================
  if(age_checked){
    svg.selectAll(".bars3 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    svg.selectAll(".bars3-2 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    svg.selectAll(".bars3-3 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    svg.selectAll(".bars3-4 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    var_start = parseInt(svg.select(".bars3 rect").attr("x")) + x.bandwidth()/vars_count - x(0);
    vars_starts[2] = var_start;
  }
  else{
    svg.selectAll(".bars3 rect").attr("width", 0);
    svg.selectAll(".bars3-2 rect").attr("width", 0);
    svg.selectAll(".bars3-3 rect").attr("width", 0);
    svg.selectAll(".bars3-4 rect").attr("width", 0);
  }

  // ================ Activité physique ========================
  if(activite_physique_checked){
    svg.selectAll(".bars4 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    svg.selectAll(".bars4-2 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    var_start = parseInt(svg.select(".bars4 rect").attr("x")) + x.bandwidth()/vars_count - x(0);
    vars_starts[3] = var_start;
  }
  else{
    svg.selectAll(".bars4 rect").attr("width", 0);
    svg.selectAll(".bars4-2 rect").attr("width", 0);
  }

  // ================ Huile ========================
  if(huile_checked){
    svg.selectAll(".bars5 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    svg.selectAll(".bars5-2 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    svg.selectAll(".bars5-3 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    svg.selectAll(".bars5-4 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    svg.selectAll(".bars5-5 rect").attr("x", (d,i) => x(i) + var_start).attr("width", x.bandwidth()/vars_count);
    var_start = parseInt(svg.select(".bars5 rect").attr("x")) + x.bandwidth()/vars_count - x(0);
    vars_starts[4] = var_start;
  }
  else{
    svg.selectAll(".bars5 rect").attr("width", 0);
    svg.selectAll(".bars5-2 rect").attr("width", 0);
    svg.selectAll(".bars5-3 rect").attr("width", 0);
    svg.selectAll(".bars5-4 rect").attr("width", 0);
    svg.selectAll(".bars5-5 rect").attr("width", 0);
  }
}

// ============================== Zooming ================================================

function zoom_x(svg) {
  zoom_x_instance = d3.zoom()
  .scaleExtent([1, 14])
  .translateExtent(zoom_extent)
  .extent(zoom_extent)
  .on("zoom", zoomed);

  svg.call(zoom_x_instance);

  function zoomed(event) {
    x.rangeRound([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
    calculateVarStarts()
    // ============== Fumer ==================
    if(fumer_checked){
      svg.selectAll(".bars rect").attr("x", (d,i) => x(i) + vars_starts[0]).attr("width", x.bandwidth()/vars_count);
      svg.selectAll(".bars-2 rect").attr("x", (d,i) => x(i) + vars_starts[0]).attr("width", x.bandwidth()/vars_count);
    }
    
    // ============ Sexe ======================
    if(sexe_checked){
      svg.selectAll(".bars2 rect").attr("x", (d,i) => x(i) + vars_starts[1]).attr("width", x.bandwidth()/vars_count);
      svg.selectAll(".bars2-2 rect").attr("x", (d,i) => x(i) + vars_starts[1]).attr("width", x.bandwidth()/vars_count);
    }
    
    // ============ Age ========================
    if(age_checked){
      svg.selectAll(".bars3 rect").attr("x", (d,i) => x(i) + vars_starts[2]).attr("width", x.bandwidth()/vars_count);
      svg.selectAll(".bars3-2 rect").attr("x", (d,i) => x(i) + vars_starts[2]).attr("width", x.bandwidth()/vars_count);
      svg.selectAll(".bars3-3 rect").attr("x", (d,i) => x(i) + vars_starts[2]).attr("width", x.bandwidth()/vars_count);
      svg.selectAll(".bars3-4 rect").attr("x", (d,i) => x(i) + vars_starts[2]).attr("width", x.bandwidth()/vars_count);
    }

    // ============ Activité physique ===========
    if(activite_physique_checked){
      svg.selectAll(".bars4 rect").attr("x", (d,i) => x(i) + vars_starts[3]).attr("width", x.bandwidth()/vars_count);
      svg.selectAll(".bars4-2 rect").attr("x", (d,i) => x(i) + vars_starts[3]).attr("width", x.bandwidth()/vars_count);
    }

    // ============ Huile ====================
    if(huile_checked){
      svg.selectAll(".bars5 rect").attr("x", (d,i) => x(i) + vars_starts[4]).attr("width", x.bandwidth()/vars_count);
      svg.selectAll(".bars5-2 rect").attr("x", (d,i) => x(i) + vars_starts[4]).attr("width", x.bandwidth()/vars_count);
      svg.selectAll(".bars5-3 rect").attr("x", (d,i) => x(i) + vars_starts[4]).attr("width", x.bandwidth()/vars_count);
      svg.selectAll(".bars5-4 rect").attr("x", (d,i) => x(i) + vars_starts[4]).attr("width", x.bandwidth()/vars_count);
      svg.selectAll(".bars5-5 rect").attr("x", (d,i) => x(i) + vars_starts[4]).attr("width", x.bandwidth()/vars_count);
    }

    svg.selectAll(".x-axis").call(xAxis);
  }
}

function zoom_y(svg){
  zoom_y_instance = d3.zoom()
      .scaleExtent([1, 14])
      .translateExtent(zoom_extent)
      .extent(zoom_extent);

  svg.call(zoom_y_instance);
}

function applyZoomXPlus(factor=1.4){
  zoom_x_instance.scaleBy(svg.transition().duration(100), factor);
}

function applyZoomXMinus(factor=0.6){
  zoom_x_instance.scaleBy(svg.transition().duration(100), factor);
}

function applyZoomYPlus(factor=1.2){
  // ============= Bars ==============
  d3.selectAll(".gen_bars rect").transition().duration(100).attr("height", (d, i, nodes) => {
    const currentHeight = parseFloat(d3.select(nodes[i]).attr('height'));
    return currentHeight * factor;
  }).attr('y', (d, i, nodes) => {
    const currentHeight = parseFloat(d3.select(nodes[i]).attr('height'));
    const pastHeight = currentHeight / factor;
    const currentY = parseFloat(d3.select(nodes[i]).attr('y'));
    return (y(0) - margin.bottom) - currentHeight - ((y(0) - margin.bottom) - (currentY + pastHeight)) * factor;
  });

  // ============= Y Axis ===========
  y_domain = y.domain();
  y = d3.scaleLinear([0, y_domain[y_domain.length - 1] / factor],[height, 80]);
  d3.select(".y-axis").transition().duration(100).call(yAxis)
}

function applyZoomYMinus(factor=0.8){
  d3.selectAll(".gen_bars rect").transition().duration(100).attr("height", (d, i, nodes) => {
    const currentHeight = parseFloat(d3.select(nodes[i]).attr('height'));
    return currentHeight * factor;
  }).attr('y', (d, i, nodes) => {
    const currentHeight = parseFloat(d3.select(nodes[i]).attr('height'));
    const pastHeight = currentHeight / factor;
    const currentY = parseFloat(d3.select(nodes[i]).attr('y'));
    return (y(0) - margin.bottom) - currentHeight - ((y(0) - margin.bottom) - (currentY + pastHeight)) * factor;
  });

  // ============= Y Axis ===========
  y_domain = y.domain();
  y = d3.scaleLinear([0, y_domain[y_domain.length - 1] / factor],[height, 80]);
  d3.select(".y-axis").transition().duration(100).call(yAxis)
}