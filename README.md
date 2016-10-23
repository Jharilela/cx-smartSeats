# cx-smartSeats
allocate seats to flight passengers based on their personal preference

Make a seat arrangement platforms for cathay pacific aircrafts based on the personalities of passangers
Talkative people would be suggested to sit beside others who want to engage in coversations
People who prefer to rest, read a book, watch a movie or do things in silence, would be suggested to sit beside others who are quiet

We use Breadth First Search (BFS) to produce heat maps of areas filled with talkative and silent people

![original screen](https://raw.githubusercontent.com/Jharilela/cx-smartSeats/master/screenshots/screen-original.png)
This is the original seat layout of the passenger flight.
blocks with an 'X' sign indicates that the seat is taken. 
empty blocks indicates that the seat is not taken

![talkative screen](https://raw.githubusercontent.com/Jharilela/cx-smartSeats/master/screenshots/screen-talkative.png)
Green mini zones indicates recomended area for passengers who "wants to talk'.
As the color fades away, the noise level reduces

![sleep screen](https://raw.githubusercontent.com/Jharilela/cx-smartSeats/master/screenshots/screen-sleep.png)
Yello mini zones indicates recomended area for passengers who "wants to sleep' or carry out any silent activities. 
As the color fades away, the noise level increases

Project built for cathay pacific hackathon Oct 2016
