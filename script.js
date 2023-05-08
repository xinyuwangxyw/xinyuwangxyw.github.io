// define svg
var canvas = document.getElementById("canvas")

// define number of rectangles
var rectNum = 15

// creates language list
var languageList = []

// // creates logarithmic scale
// var logScale = d3.scaleSymlog()
//     .domain([0, 7500000])
//     .range([0, 500])

// load in data
d3.csv("df.csv").then(ready)

// d3 action
function ready(data) {
    // *********** RANDOM LANGUAGES *************
    // generates 15 random indices; no overlaps!
    var randNumList = []
    var rowNum = data.length
    for (let n=1; n<rectNum+1; n++) {
        var randNum = Math.floor(Math.random() * (rowNum - 1)) + 1
        // no dupes
        if (randNumList.includes(randNum) == false) {
            randNumList.push(randNum)
        } else {
            rectNum = rectNum+1     // if dupes are present, add 1 more loop
        }
    }
    console.log(randNumList)

    // using the 15 random indices to subset data
    var dataRandom = []
    for (let n=0; n<randNumList.length; n++) {
        dataRandom.push(data[randNumList[n]])
    }
    console.log(dataRandom)
 
    // appends divs/rects/cards
    var card = d3
    .select(canvas)
    .selectAll("div")
    .data(dataRandom)
    .join("div")
        .attr("class", "card")
        .on("click", (e, d) => {
            // clears canvas
            d3.select("#language-details").selectAll("*").remove();
            
            var details = d3
            .select("#language-details")

            var close = details
            .append('span')
                .attr('class', 'close')
            .append('svg')
                .attr('width', 50)
                .attr('height', 50)
                .attr('viewBox', '0 0 50 50')
                .attr('fill', 'none')
                .attr('xmlns', 'http://www.w3.org/2000/svg')
            .append('path')
                .attr('d', 'M30.8617 25L48.8013 7.0604C50.3996 5.46211 50.3996 2.79787 48.8013 1.19871C47.203 -0.399571 44.5388 -0.399571 42.9396 1.19871L25 19.1383L7.0604 1.19871C5.46211 -0.399571 2.79787 -0.399571 1.19871 1.19871C-0.399571 2.797 -0.399571 5.46124 1.19871 7.0604L19.1383 25L1.19871 42.9396C-0.399571 44.5379 -0.399571 47.2021 1.19871 48.8013C2.797 50.3996 5.46124 50.3996 7.0604 48.8013L25 30.8617L42.9396 48.8013C44.5379 50.3996 47.2021 50.3996 48.8013 48.8013C50.3996 47.203 50.3996 44.5388 48.8013 42.9396L30.8617 25Z')
                .attr('fill', '#0D0B06')
            
            var content = details
            .style("visibility", "visible")
            .append("div")
                .attr("class", "language-details-content")
            
            var title = content
            .append("div")
                .attr("id", "language-details-title")
            
            var popup = title
            .append('div')
                .attr('id', 'popup')
            
            var popupText = popup
            .append('p')
            
            // DROPDOWN BUTTON
            var button = title
            .append("button")
                .attr("class", "dropdown")
                .attr("type", "button")
                .text(d.Degreeofendangerment)
                .on('click', (e, d) => {
                    popup.style('visibility', 'visible')
                })
            
            // colors button according to endangerment level
            // extinct
            var buttonExtinct = button.filter(function(d) { return d3.select(this).text() === "Extinct"})
            buttonExtinct.style("background-color", "#F94144")
            popupText.text("There are no speakers left. – UNESCO")
            // critically endangered
            var buttonCritically = button.filter(function(d) { return d3.select(this).text() === "Critically endangered"})
            buttonCritically.style("background-color", "#F3722C")
            popupText.text("The youngest speakers are grandparents and older, and they speak the language partially and infrequently. – UNESCO")
            // severely endangered
            var buttonSeverely = button.filter(function(d) { return d3.select(this).text() === "Severely endangered"})
            buttonSeverely.style("background-color", "#F9C74F")
            popupText.text("Language is spoken by grandparents and older generations; while the parent generation may understand it, they do not speak it to children or among themselves. – UNESCO")
            // definitely endangered
            var buttonDefinitely = button.filter(function(d) { return d3.select(this).text() === "Definitely endangered"})
            buttonDefinitely.style("background-color", "#90BE6D")
            popupText.text("Children no longer learn the language as a 'mother tongue' in the home. – UNESCO")
            // vulnerable
            var buttonVulnerable = button.filter(function(d) { return d3.select(this).text() === "Vulnerable"})
            buttonVulnerable.style("background-color", "#37ABDC")
            popupText.text("Most children speak the language, but it may be restricted to certain domains (e.g., home). – UNESCO")
            
            // add icon
            var question = button
            .append("span")
            .append("svg")
                .style("margin-bottom", "2px")
                .attr('width', 20)
                .attr('height', 20)
                .attr('viewBox', '0 0 20 20')
                .attr('fill', 'none')
                .attr('xmlns', 'http://www.w3.org/2000/svg')
            question
            .append('path')
                .attr('d', 'M9.99995 14.0479C9.73704 14.0479 9.5238 14.2613 9.5238 14.524V15.4763C9.5238 15.7392 9.73722 15.9524 9.99995 15.9524C10.2629 15.9524 10.4761 15.739 10.4761 15.4763V14.524C10.4761 14.2613 10.2629 14.0479 9.99995 14.0479Z')
                .attr('fill', 'black')
            question
            .append("path")
                .attr('d', 'M7.81847 6.39623C7.85916 6.35272 7.90201 6.30506 7.94752 6.25407C8.35442 5.79998 8.91215 5.17834 10.1252 5.17834C11.4726 5.17834 12.3067 6.05874 12.3067 6.87469C12.3067 7.69216 11.9088 8.05785 11.0086 8.80738L10.9453 8.8602C9.94304 9.69557 9.524 10.3363 9.524 12.1426C9.524 12.4055 9.73741 12.6188 10.0001 12.6188C10.2631 12.6188 10.4763 12.4054 10.4763 12.1426C10.4763 10.626 10.7558 10.2576 11.5548 9.59162L11.6179 9.53897C12.4983 8.80589 13.2588 8.17277 13.2588 6.87468C13.2588 5.60066 12.0607 4.22583 10.125 4.22583C8.48664 4.22583 7.67448 5.13148 7.23834 5.61792C7.19715 5.66393 7.15862 5.70694 7.12208 5.7463C6.94255 5.93862 6.95301 6.23988 7.14517 6.41943C7.33766 6.5988 7.63909 6.58834 7.81847 6.39618L7.81847 6.39623Z')
                .attr('fill', 'black')
            question
            .append('path')
                .attr('d', 'M10 20C15.4205 20 20 15.4209 20 10C20 4.57908 15.4205 0 10 0C4.57951 0 0 4.57908 0 10C0 15.4209 4.57951 20 10 20ZM10 0.952381C14.9043 0.952381 19.0476 5.09579 19.0476 10C19.0476 14.9042 14.9042 19.0476 10 19.0476C5.09579 19.0476 0.952381 14.9042 0.952381 10C0.952381 5.09579 5.09579 0.952381 10 0.952381Z')
                .attr('fill', 'black')
            
            // LANGUAGE NAME
            var h1 = title
            .append("h1")
                .text(d.NameinEnglish)
            
            // STATUS BAR
            var statusBar = content
            .append('svg')
                .attr('id', 'status-bar')
                .attr('height', 120).attr('width', 500)
            
            statusBar
            .append("rect")
                .attr('class', 'bar')
                .attr('x', 0).attr('y', 45)
                .attr("rx", 20).attr("ry", 20)
                .attr('width', 500)
                .attr('height', 30)
            
            var barShort = statusBar
            .append("rect")
                .attr('class', 'bar short')
                .attr('x', 0).attr('y', 45)
                .attr("rx", 20).attr("ry", 20)
                .attr('height', 30)
                .attr('width', d.Numberofspeakers/7500000*500)

            statusBar
            .append("text")
                .attr("x", 0).attr('y', 100)
                .text('0 Speakers')
                .attr('text-anchor', 'middle')
            
            statusBar
            .append('text')
                .attr('x', 500).attr('y', 100)
                .text('7M Speakers')
                .attr('text-anchor', 'middle')

            statusBar
            .append('text')
                .attr('class', 'highlight')
                .attr('x', d.Numberofspeakers/7500000*500+25).attr('y', 60)
                .text(d.NumStr)
                .attr('dominant-baseline', 'central')

            // ADDITIONAL INFORMATION
            var bulletList = content
            .append("ul")
                .attr("id", "bullet-list")
            
            // add entries
            bulletList
            .append("li")
                .attr("class", "bullet-list-item")
                .style("font-weight", "bold")       // bolds the label 
                .text("Also known as: ")
            .append("tspan")
                .style("font-weight", "normal")     // unbolds the text
                .text(d.Alternatenames)
            bulletList
            .append("li")
                .attr("class", "bullet-list-item")
                .style("font-weight", "bold")
                .text("Where it's spoken: ")
            .append("tspan")
                .style("font-weight", "normal")
                .text(d.Descriptionofthelocation)
            bulletList
            .append("li")
                .attr("class", "bullet-list-item")
                .style("font-weight", "bold")
                .text("Sources: ")
            .append("tspan")
                .style("font-weight", "normal")
                .text(d.Sources)
            
            close
                .on('click', (e, d) => {
                    details.style('visibility', 'hidden')
                })
        })

    // adds card content container
    var content = card
    .append("div")
        .attr("class", "card-content")
    
    // adds language name
    var languages = content
    .append("p")
        .attr("class", "language-name")
        .text((d) => d.NameinEnglish)

    // adds number of speakers
    content
    .append("p")
        .attr("class", "speaker-num")
        .text((d) => d.NumStr)

    // adds country info
    var countries = content
    .append("span")
        .attr("class", "countries-container")
    .append("p")
        .attr("class", "countries")
        .text((d) => d.Countries)

    // adds text scroll if text too long
    // language name
    var langLong = languages
    .filter(function(d) {
        return d.NameinEnglish.length >=14
    });
    langLong
    .style("animation", "text-scroll 9s linear infinite alternate")
    .style('-moz-animation', "text-scroll 9s linear infinite alternate")
    .style(' -webkit-animation', "text-scroll 9s linear infinite alternate")
    // countries
    var counLong = countries
    .filter(function(d) {
        return d.Countries.length >=25
    });
    counLong
    .style("animation", "text-scroll 9s linear infinite alternate")
    .style('-moz-animation', "text-scroll 9s linear infinite alternate")
    .style(' -webkit-animation', "text-scroll 9s linear infinite alternate")

    // colors card according to endangerment level
    // extinct
    var extinct = card.filter(function(d) {return d.Degreeofendangerment == "Extinct"})
    extinct.style("background-color", "#F94144")
    // critically endangered
    var critically = card.filter(function(d) {return d.Degreeofendangerment == "Critically endangered"})
    critically.style("background-color", "#F3722C")
    // severely endangered
    var severely = card.filter(function(d) {return d.Degreeofendangerment == "Severely endangered"})
    severely.style("background-color", "#F9C74F")
    // definitely endangered
    var definitely = card.filter(function(d) {return d.Degreeofendangerment == "Definitely endangered"})
    definitely.style("background-color", "#90BE6D")
    // vulnerable
    var vulnerable = card.filter(function(d) {return d.Degreeofendangerment == "Vulnerable"})
    vulnerable.style("background-color", "#37ABDC")
}

function refreshPage() {
    window.location.reload()
}

