# MovieDB-viewer
v 1.0

Simple project that connects to a Movie Database (https://developers.themoviedb.org/3/getting-started/introduction) and retrieves a list of movies ordered by their popularity.
Also has a movie details previewer, where a poster, title and overview are showed.

## Project features:
- Basic MVC settings, based on local IIS virtual path
- KnockoutJS 3.5.1 as a core framework and jQuery 3.5.1 as an auxilary tool. Application's main features use Knockout's components and handlers.
- Some basic styling based on SASS
- Gulp for JS and CSS bundling/watch file changes
- ASP.NET's JS and CSS minifier
- Nicescroll jQuery plugin for nice-looking scrollbars (https://nicescroll.areaaperta.com/)

## How to run
1. Run 'npm install' through a CMD/PowerShell inside project's folder.
2. Open solution with Administrator rights. After opening a solution in Visual Studio, Gulp tasks (default and watch) should automatically run. You should see 'Content/main.css' and 'Scripts/bundle.js' files been created.
3. Project is set to load using Local IIS and you'll need to create a virtual directory for it. 
Tip: You need to open project properties and on the 'Web' tab click 'Create Virtual Directory'
4. Open 'Scripts/app/settings.js' file and set your apiKey.
Tip: you car request for a new key after registering on 'https://www.themoviedb.org'. After registration new ApiKey can be generated on 'https://www.themoviedb.org/settings/api'
5. Build project and load 'http://localhost/MovieDB' URL.

Voila!

## Minifications
As for the minification of JS/CSS files and file versions, this work is done automatically by ASP.NET's bundle configuration, based on publish properties. E.g. for Production profile, it should automatically minify and update these files versions.

## Possible problems
Sometimes after the first build, hitting URL may result to an error "Could not find a part of the path... \bin\roslyn\csc.exe".
This mainly happens because after downloading project's nuget packages VS somehow manages not to copy required to run roslyn binaries into the 'bin' folder. Just rebuild the project again and this problem should vanish.