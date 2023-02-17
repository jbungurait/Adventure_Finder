# Adventure_Finder

"A user-friendly web application that helps travelers discover thrilling activities at their chosen destination."

## User Story 
- As an avid traveler, I want to create a web application that provides local Brewery, Hotel, and Entertainment options in the area when I search for a specific city.  
- As an avid traveler, I want to use a web application with a location aware map that incorporates an autocomplete feature when I begin searching for a city. 


## Functionality
Adventure Finder includes a large area map and search bar which autocompletes a city result given a user searches for city. The application provides the most results in all three categories for larger metropolitan areas (i.e. Austin, TX or Seattle, WA). Smaller cities or townships may only provide brewery or hotel information, where "entertainment" businesses categorized by the Geoapify API may not be present. 

## APIs
[Geoapify](https://www.geoapify.com/)
[Open Brewery DB](https://www.openbrewerydb.org/)


## Deployed Application 
[Link to Deployed Application - https://jbungurait.github.io/Adventure_Finder/](https://jbungurait.github.io/Adventure_Finder/)
![Screenshot of Deployed Application](/assets/images/screenshot.jpg)


## Collaborators
- [Allyson Gonzales, GitHub Ally27](https://github.com/Ally27)
- [Kyle Armour, GitHub kylearmour1](https://github.com/kylearmour1)
- [Josh Ungurait, GitHub jbungurait](https://github.com/jbungurait/Adventure_Finder)
- [Olive Provencio-Johnson, GitHub Olive-Provencio-Johnson](https://github.com/Olive-Provencio-Johnson)


## License

[MIT](https://choosealicense.com/licenses/mit/)

Copyright (c) 2023 jbungurait

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

  if(currentPage === 6) {
          var storedLeaderboardData = JSON.parse(localStorage.getItem("leaderboardData")) || [];
          storedLeaderboardData.sort(function(a, b) {
            return b.score - a.score;
          });
          var leaderboard = document.getElementById("leaderboard");
          for (var i = 0; i < storedLeaderboardData.length; i ++){
            var leaderboardItem = document.createElement("div");
            leaderboardItem.innerHTML = storedLeaderboardData[i].initials + ": " + storedLeaderboardData[i].score;
            leaderboard.appendChild(leaderboardItem);
            
          }
        }
       
      });
      
    }