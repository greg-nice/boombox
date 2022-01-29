# Summary

Boombox is a single-page web application inspired by Spotify and built using Javascript React.js/Redux architecture with an Python/Flask backend. Boombox allows users to:

- Create an account
- Log in / Log out
- Create, read, update, and delete Playlists
- Play songs from Playlists
- Continuosly play songs and Playlists while browsing the site
- Add songs to and delete songs from Playlists
- Browse Albums and Artists
- Follow and unfollow other users
- View other users' public Playlists and follow and unfollow them
- View a selection of built-in Playlists
- Create a live queue of songs

#### Live link: https://boombox-greg-nice.herokuapp.com
#### MVP Feature list: https://github.com/greg-nice/capstone/wiki/MVP-Feature-List
#### Database Schema: https://github.com/greg-nice/capstone/wiki/Database-Schema

<br>
<br>

Home Page (logged-in user)
<img src="https://media.discordapp.net/attachments/920418592820957228/927493729768583248/Screen_Shot_2022-01-03_at_1.25.04_AM.png?width=1708&height=1068"></img>

Playlist Page (logged-in user)
<img src="https://media.discordapp.net/attachments/920418592820957228/927493638190145656/Screen_Shot_2022-01-03_at_1.25.53_AM.png?width=1708&height=1068"></img>

<br>
<br>

# React Components

* HomePage - Displays user's most recently created playlists as well as the site's Featured Playlists

* NavBar - Allows user to log in and log out and view the developer's "About" information

* SideBar - Displays navigation links to the home page, the user's playlist library, and link to the user's playlists, as well as a button to create a new playlist

* NowPlaying - Allows user to play/pause songs, adjust volume, rewind/fastforward and skip tracks.

* TeaserBar - Prompts a logged-out user to sign in/sign up

* PlaylistEditModal - Allows user to edit Playlist metadata (title and description)

* PlaylistsCollection - Displays a user's library of playlists and the playlists the user follows

* OneUser - Displays some of another user's public playlists and followers/follows, and allows the a user to follow another user

* OnePlaylist - Displays a Playlist and its songs; allows a user to play, add, or delete songs

* OneAlbum - Displays an Album and its songs; allows a user to add songs to the user's playlists

* OneArtist - Displays a pic of the artist and lists links to the artist's albums

* LoginForm

* LogoutButton

* SignUpForm

* ProtectedRoute

<br>
<br>

# Frontend routes
```
    <BrowserRouter>
      <div className="top-container">
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <SideBar />
        {sessionUser && <NowPlaying />}
        {!sessionUser && <TeaserBar />}
        <div className="main-view">
          <NavBar />
          <Switch>
            <Route path='/' exact={true} >
              <HomePage />
            </Route>
            <Route path='/playlists/:playlistId' exact={true}>
              <OnePlaylist />
            </Route>
            <Route path='/artists/:artistId' exact={true}>
              <OneArtist />
            </Route>
            <Route path='/albums/:albumId' exact={true}>
              <OneAlbum />
            </Route>
            <Route path='/users/:userId' exact={true}>
              <OneUser />
            </Route>
            <ProtectedRoute path='/collections' exact={true}>
              <Collections />
            </ProtectedRoute>
            <ProtectedRoute path='/collections/playlists' exact={true}>
              <PlaylistsCollection />
            </ProtectedRoute>
            <Route path="/">
              <div>Page Not Found, 404</div>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
```

<br>
<br>


# Backend routes

## Users

* GET /api/users/:id - get user


## Playlists

* GET /api/playlists/ - get session user's playlists

* GET /api/playlists/featured - get featured playlists

* GET /api/playlists/:id - get one playlist

* POST /api/playlists/simple - create playlist

* PUT /api/playlists/:id - update playlist name/description

* PUT /api/playlists/:id/public - make playlist public

* PUT /api/playlists/:id/private - make playlist private

* PATCH /api/playlists/:id - add song to playlist

* DELETE /api/playlists/:id/playlist_songs/:id - delete song from playlist

* DELETE /api/playlists/:id - delete playlist

## User Follows

* GET /api/follows - get session user's follows (followers & following)

* POST /api/following/:id - add one user to session user's following list

* DELETE /api/following/:id - delete one user from session user's following list


## Playlist Follows

* GET /api/followed-playlists - get playlists followed by session user

* POST /api/playlists/:id/follow - add session user as follower of playlist

* DELETE /api/playlists/:id/follow - delete session user as follower of playlist

## Albums

* GET /api/albums/:id - album

## Artists

* GET /api/artists/:id - artist

### Auth routes (pre-built with starter)

<br>
<br>

# Project Installation

1. Clone the project repository from https://github.com/greg-nice/capstone.git

2. Rename the folder to whatever you want.

3. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

4. Create a **.env** file based on the example with proper settings for your
   development environment
5. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

6. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory OR `cd` into the `react-app` folder and run `npm install` to install node package manager dependencies.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

<br>
<br>

# Running Locally
>To start the server, run `flask run` from the root directory, then run `npm start` from the `react-app` directory. This will allow you to make requests to http://localhost:3000 using any client (browser and Postman).
>To stop the server from listening to requests, press CTRL + c for Windows/Linux or CMD + c for MacOS in the terminal that you started the server (wherever you >ran npm start).

<br>
<br>

# Running Live
>The live link for this project is located here: https://boombox-greg-nice.herokuapp.com/

<br>
<br>

# To-Do:
* [ ] Play Albums
* [ ] Search
* [ ] Shuffle Play
* [ ] User edit and upload profile pic
* [ ] User selects playlist cover pic
