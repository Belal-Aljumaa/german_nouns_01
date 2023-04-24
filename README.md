# blank-vite-dark

This is a minimal React site created with Vite.

![grafik](https://user-images.githubusercontent.com/92271729/201470538-1c3dd7e6-3e1b-4500-8813-cd11e76505db.png)

## includes:

- TypeScript
- Sass
- only one Sass file (`App.scss`) - the file `index.css` was deleted
- page-load flicker bug fixed in index.html:
```
  <style>
    body {
      background-color: #333;
    }
  </style>
```

## how to install

- download zip
- copy all files to new directory, e.g. `/home/yourname/projects/site001`
- open VSCode in that directory (`code .`)
- `npm i`
- `npm run dev`
