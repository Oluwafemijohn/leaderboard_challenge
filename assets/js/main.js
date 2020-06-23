// API Caller Class
class easyHTTP {
    // This is in an asynchroous way by wrapping it into a Promise
    async get(url) {
        // Better way to get Data from API
        const res = await fetch(url);
        return await res.json();
    }

    async post(url, data) {
        // Better way to get Data from API
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await res.json();
    }
}

const http = new easyHTTP();
let currUrl = window.location.href;

const getData = async (e) => {
    e.preventDefault();
    let cusUrl = currUrl += `json`;
    let result = {};
    await http.get(cusUrl)
        .then(resps => result = resps)
        .catch(err => console.log(err));

    let th = '<th scope="col">#</th>'
    let tr = ''
    let count = 0
    result.data.forEach((element,id) => {
        count++
        if (id === 0) {
            tr += `<tr class="bg-success">
                <th scope="row">${id+1}</th>
                <td >${element["FULL NAME"]}</td>
                <td>${element["USERNAME"]}</td>
                <td>${element["EMAIL"]}</td>
                <td>${element["TOTAL POINTS"]}</td>
                <td style="display: flex; align-items: center; justify-content: center; " >
                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" target="_blank" class="twitter-share-button pr-2" data-text="HNGi7 Central Leaderboard\n\nMY TOTAL POINTS: ${element["TOTAL POINTS"]}."  data-hashtags="HNGi7"  data-show-count="false"  data-url="\n\nFrom: ${currUrl}\n">Tweet</a>

                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fleaderbrd.herokuapp.com%2F&amp;src=sdkpreparse" class=" fb-share-button fb-xfbml-parse-ignore" style="margin-top: -4px; margin-left: 10px;" data-href="https://leaderbrd.herokuapp.com/" data-layout="button" data-size="small">Facebook</a>
                </td>
            </tr>`
        } 
        if (id === 1) {
            tr += `<tr class="bg-info">
                <th scope="row">${id+1}</th>
                <td >${element["FULL NAME"]}</td>
                <td>${element["USERNAME"]}</td>
                <td>${element["EMAIL"]}</td>
                <td>${element["TOTAL POINTS"]}</td>
                <td style="display: flex; align-items: center; justify-content: center; " >
                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" target="_blank" class="twitter-share-button pr-2" data-text="HNGi7 Central Leaderboard\n\nMY TOTAL POINTS: ${element["TOTAL POINTS"]}."  data-hashtags="HNGi7"  data-show-count="false"  data-url="\n\nFrom: ${currUrl}\n">Tweet</a>

                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fleaderbrd.herokuapp.com%2F&amp;src=sdkpreparse" class=" fb-share-button fb-xfbml-parse-ignore" style="margin-top: -4px; margin-left: 10px;" data-href="https://leaderbrd.herokuapp.com/" data-layout="button" data-size="small">Facebook</a>
                </td>
            </tr>`
        }
        if (id === 2) {
            tr += `<tr class="bg-warning">
                <th scope="row">${id+1}</th>
                <td >${element["FULL NAME"]}</td>
                <td>${element["USERNAME"]}</td>
                <td>${element["EMAIL"]}</td>
                <td>${element["TOTAL POINTS"]}</td>
                <td style="display: flex; align-items: center; justify-content: center; " >
                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" target="_blank" class="twitter-share-button pr-2" data-text="HNGi7 Central Leaderboard\n\nMY TOTAL POINTS: ${element["TOTAL POINTS"]}."  data-hashtags="HNGi7"  data-show-count="false"  data-url="\n\nFrom: ${currUrl}\n">Tweet</a>

                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fleaderbrd.herokuapp.com%2F&amp;src=sdkpreparse" class=" fb-share-button fb-xfbml-parse-ignore" style="margin-top: -4px; margin-left: 10px;" data-href="https://leaderbrd.herokuapp.com/" data-layout="button" data-size="small">Facebook</a>
                </td>
            </tr>`
        } 
        if(id > 2) {
            tr += `<tr>
                <th scope="row">${id+1}</th>
                <td>${element["FULL NAME"]}</td>
                <td>${element["USERNAME"]}</td>
                <td>${element["EMAIL"]}</td>
                <td>${element["TOTAL POINTS"]}</td>
                <td style="display: flex; align-items: center; justify-content: center; " >
                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" target="_blank" class="twitter-share-button pr-2" data-text="HNGi7 Central Leaderboard\n\nMY TOTAL POINTS: ${element["TOTAL POINTS"]}."  data-hashtags="HNGi7"  data-show-count="false"  data-url="\n\nFrom: ${currUrl}\n">Tweet</a>

                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fleaderbrd.herokuapp.com%2F&amp;src=sdkpreparse" class=" fb-share-button fb-xfbml-parse-ignore" style="margin-top: -4px; margin-left: 10px;" data-href="https://leaderbrd.herokuapp.com/" data-layout="button" data-size="small">Facebook</a>
                </td>
            </tr>`
        }
        if (count === 1) {
            for (const property in element) {
                th += `<th scope="col">${property}</th>`
            }
        }
    });

    th += '<th scope="col" style="width: 90px;">Share</th>'

    document.querySelector('#total').innerHTML = await `Total: ${count}`
    const thead = document.querySelector('#thead')
    thead.innerHTML = await th

    const tbody = document.querySelector('#tbody')
    tbody.innerHTML = await tr
    
}

// Get Posts on DOM Load
document.addEventListener('DOMContentLoaded', getData);
