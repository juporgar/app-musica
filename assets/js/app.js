SC.initialize({
    client_id: 'QyPi1UIiAXHektIfaZyKDQSp25ZaerWL'
 })
 
 let pintarImagen=(tracks, i)=>`<div class='imagen_mini col-2 img'><img src=
 ${tracks[i].artwork_url} id = ${tracks[i].id} draggable='true' ondragstart='onDragStart(event)'></div>
 `
 let pintarImagenDefecto=(tracks, i)=>`<div class='imagen_mini col-2 img'><img src=
 './assets/imag/img_r.jpg' id = ${tracks[i].id} draggable='true' ondragstart='onDragStart(event)'></div>
 `
 
 function miFunc() {
    let val = $('input').val();
    $('input').val('');
    SC.get('/tracks', {
        q:val
    }).then(function(tracks){
        for (let i = 0; i < 10; i++) {
            if(tracks[i].artwork_url===null){
                $('.music').append(pintarImagenDefecto(tracks, i));
            } else {
            $('.music').append(pintarImagen(tracks, i));
            }
            //console.log(tracks);
        }
    });
 }
 
 function onDragOver(e){
    e.preventDefault();
 }
 
 function onDragStart(e){
    //console.log(miMusic)
    e.dataTransfer.setData('id', e.target.id);
    //console.log(e.dataTransfer);
 
 }
 
 function onDrop(e){
   // console.log(e)
    var data = e.dataTransfer.getData('id');
    e.target.appendChild(document.getElementById(data));
    SC.stream('/tracks/'+data)
    .then(function(player){
    player.play();
    }
    
    )}


/* Muestra todo lo que esta sobre un grupo, en este caso "U2*/

//  SC.get('/tracks',{
//      q:'U2'
//  }).then(function(tracks){
//      console.log('Listado de canciones->' + JSON.stringify(tracks, null, 2));
//  })

/*Muestra toda la información sobre una cancion, cogiendo la ID que en este caso es "39654171"*/

// SC.get('/tracks/39654171').then(function(track){
//     console.log('Descripcion cancion ->' + JSON.stringify(track, null, 2));
// })

/*Para que suene la cancion*/

// SC.stream('/tracks/39654171').then(function(player){
//     player.play();
// }).catch(function(error){
//     alert('Error: ->' + error)
// })

