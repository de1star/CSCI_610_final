  'use strict';

  // Global variables that are set and used
  // across the application
  let gl;

  // GLSL programs
  let program;
  
  // VAOs for the objects
  var mySphere = null;
  var mySphere2 = null;
  var myCone = null;
  var myCube1 = null;
  var myCube2 = null;
  var myCube3 = null;
  var myCube4 = null;
  var myCube5 = null;
  var myCube6 = null;
  var myCube7 = null;
  var myCube8 = null;
  var myCube9 = null;
  var myCube10 = null;
  var myCube11 = null;
  var smallCube1 = null;
  var smallCube2 = null;
  var smallCube3 = null;
  var smallCube4 = null;
  var smallCube5 = null;
  var smallCube6 = null;
  var table = null;
  var teapot1 = null;
  var teapot2 = null;

  // textures
  let platTexture;
  let woodTexture;
  let brickTexture;
  let brick2Texture;
  let curTexture = "";

  // rotation
  var angles = [30.0, 30.0, 0.0];
  var angleInc = 5.0;
//
// create shapes and VAOs for objects.
// Note that you will need to bindVAO separately for each object / program based
// upon the vertex attributes found in each program
//
function createShapes() {
    mySphere = new Sphere(20, 20);
    mySphere.VAO = bindVAO (mySphere, program);

    mySphere2 = new Sphere(20, 20);
    mySphere2.VAO = bindVAO (mySphere2, program);

    myCone = new Cone(20, 20);
    myCone.VAO = bindVAO (myCone, program);

    myCube1 = new Cube(20);
    myCube1.VAO = bindVAO (myCube1, program);

    myCube2 = new Cube(20);
    myCube2.VAO = bindVAO (myCube2, program);

    myCube3 = new Cube(20);
    myCube3.VAO = bindVAO (myCube3, program);

    myCube4 = new Cube(20);
    myCube4.VAO = bindVAO (myCube4, program);

    myCube5 = new Cube(20);
    myCube5.VAO = bindVAO (myCube5, program);

    myCube6 = new Cube(20);
    myCube6.VAO = bindVAO (myCube6, program);

    myCube7 = new Cube(20);
    myCube7.VAO = bindVAO (myCube7, program);

    myCube8 = new Cube(20);
    myCube8.VAO = bindVAO (myCube8, program);

    myCube9 = new Cube(20);
    myCube9.VAO = bindVAO (myCube9, program);

    myCube10 = new Cube(20);
    myCube10.VAO = bindVAO (myCube10, program);

    myCube11 = new Cube(50);
    myCube11.VAO = bindVAO (myCube11, program);

    smallCube1 = new Cube(3);
    smallCube1.VAO = bindVAO (smallCube1, program);

    smallCube2 = new Cube(3);
    smallCube2.VAO = bindVAO (smallCube2, program);

    smallCube3 = new Cube(3);
    smallCube3.VAO = bindVAO (smallCube3, program);

    smallCube4 = new Cube(3);
    smallCube4.VAO = bindVAO (smallCube4, program);

    smallCube5 = new Cube(3);
    smallCube5.VAO = bindVAO (smallCube5, program);

    smallCube6 = new Cube(3);
    smallCube6.VAO = bindVAO (smallCube6, program);

    table = new Cube(20);
    table.VAO = bindVAO(table, program);

    teapot1 = new Teapot();
    teapot1.VAO = bindVAO (teapot1, program);

    teapot2 = new Teapot();
    teapot2.VAO = bindVAO (teapot2, program);
}


//
// Here you set up your camera position, orientation, and projection
// Remember that your projection and view matrices are sent to the vertex shader
// as uniforms, using whatever name you supply in the shaders
//
function setUpCamera(program) {
    
    gl.useProgram (program);
    
    // set up your projection
    let projMatrix = glMatrix.mat4.create();
    glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1.0, 300.0);
    gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

    let viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(viewMatrix, [-20, 20, -80], [2, 1.5, 2], [0, 1, 0]); // -20, 20, -80
    var translateVec = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec, 0.5, 3, -2.7)
    glMatrix.mat4.translate(viewMatrix, viewMatrix, translateVec);
    var scaleVec = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec, 0.5, 0.5, 0.5)
    glMatrix.mat4.scale(viewMatrix, viewMatrix, scaleVec)
    gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);
}


//
// load up the textures you will use in the shader(s)
// The setup for the globe texture is done for you
// Any additional images that you include will need to
// set up as well.
//
function setUpTextures(){
    
    // flip Y for WebGL
    gl.pixelStorei (gl.UNPACK_FLIP_Y_WEBGL, true);
    
    // get some texture space from the gpu
    platTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, platTexture);

    // load the actual image
    var platImage = document.getElementById ('plat-texture')
    platImage.crossOrigin = "";

    // bind the texture so we can perform operations on it
    gl.bindTexture (gl.TEXTURE_2D, platTexture);

    // load the texture data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, platImage.width, platImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, platImage);

    // set texturing parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    platImage.onload = () => {
        platImage.crossOrigin = "";
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // get some texture space from the gpu
    woodTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, woodTexture);

    // load the actual image
    var woodImage = document.getElementById ('wood-texture')
    woodImage.crossOrigin = "";

    // bind the texture so we can perform operations on it
    gl.bindTexture (gl.TEXTURE_2D, woodTexture);

    // load the texture data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, woodImage.width, woodImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, woodImage);

    // set texturing parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    woodImage.onload = () => {
        woodImage.crossOrigin = "";
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // get some texture space from the gpu
    brickTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, brickTexture);

    // load the actual image
    var brickImage = document.getElementById ('brick-texture')
    brickImage.crossOrigin = "";

    // bind the texture so we can perform operations on it
    gl.bindTexture (gl.TEXTURE_2D, brickTexture);

    // load the texture data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, brickImage.width, brickImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, brickImage);

    // set texturing parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    brickImage.onload = () => {
        brickImage.crossOrigin = "";
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // get some texture space from the gpu
    brick2Texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, brick2Texture);

    // load the actual image
    var brick2Image = document.getElementById ('brick2-texture')
    brick2Image.crossOrigin = "";

    // bind the texture so we can perform operations on it
    gl.bindTexture (gl.TEXTURE_2D, brick2Texture);

    // load the texture data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, brick2Image.width, brick2Image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, brick2Image);

    // set texturing parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    brick2Image.onload = () => {
        brick2Image.crossOrigin = "";
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
}

//
//  This function draws all of the shapes required for your scene
//
function drawShapes() {
    var scaleVec1 = glMatrix.vec3.create()
    glMatrix.vec3.set(scaleVec1, 2.5, 0.3, 2.5)
    var scaleVec2 = glMatrix.vec3.create()
    glMatrix.vec3.set(scaleVec2, 1, 3, 1)

    var current_program;
    var current_program = program;
    gl.useProgram(current_program);
    gl.activeTexture (gl.TEXTURE0);

    // draw sphere1
    gl.uniform1i (program.uTexType, 2);
    let sphere_position = glMatrix.mat4.create();
    // translation
    var translateVec = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec, 4, 0.5, 0)
    glMatrix.mat4.translate(sphere_position, sphere_position, translateVec);
    // scale
    var scaleVec = glMatrix.vec3.create()
    glMatrix.vec3.set(scaleVec, 1, 1, 1)
    glMatrix.mat4.scale(sphere_position, sphere_position, scaleVec)
    gl.uniformMatrix4fv (program.uModelT, false, sphere_position);
    gl.bindTexture(gl.TEXTURE_2D, woodTexture);
    gl.bindVertexArray(mySphere.VAO);
    gl.drawElements(gl.TRIANGLES, mySphere.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.uniform1i (program.uTexType, 0);

    // bottom for sphere1
    let cube4_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, 4, -0.2, 0)
    glMatrix.mat4.translate(cube4_position, cube4_position, translateVec1);
    // scale
    glMatrix.mat4.scale(cube4_position, cube4_position, scaleVec1)
    gl.uniformMatrix4fv (program.uModelT, false, cube4_position);
    gl.bindVertexArray(myCube4.VAO);
    gl.drawElements(gl.TRIANGLES, myCube4.indices.length, gl.UNSIGNED_SHORT, 0);

    // bottom for sphere1
    let cube5_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, 4, -2, 0)
    glMatrix.mat4.translate(cube5_position, cube5_position, translateVec1);
    // scale
    glMatrix.mat4.scale(cube5_position, cube5_position, scaleVec2)
    gl.uniformMatrix4fv (program.uModelT, false, cube5_position);
    gl.bindVertexArray(myCube5.VAO);
    gl.drawElements(gl.TRIANGLES, myCube5.indices.length, gl.UNSIGNED_SHORT, 0);



    // draw sphere2
    gl.uniform1i (program.uTexType, 2);
    let sphere2_position = glMatrix.mat4.create();
    // translation
    var translateVec = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec, -4, 0.5, 0)
    glMatrix.mat4.translate(sphere2_position, sphere2_position, translateVec);
    // scale
    var scaleVec = glMatrix.vec3.create()
    glMatrix.vec3.set(scaleVec, 1, 1, 1)
    glMatrix.mat4.scale(sphere2_position, sphere2_position, scaleVec)
    gl.uniformMatrix4fv (program.uModelT, false, sphere2_position);
    gl.bindTexture(gl.TEXTURE_2D, woodTexture);
    gl.bindVertexArray(mySphere2.VAO);
    gl.drawElements(gl.TRIANGLES, mySphere2.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.uniform1i (program.uTexType, 0);

    // bottom for sphere2
    let cube7_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, -4, -0.2, 0)
    glMatrix.mat4.translate(cube7_position, cube7_position, translateVec1);
    // scale
    glMatrix.mat4.scale(cube7_position, cube7_position, scaleVec1)
    gl.uniformMatrix4fv (program.uModelT, false, cube7_position);
    gl.bindVertexArray(myCube7.VAO);
    gl.drawElements(gl.TRIANGLES, myCube7.indices.length, gl.UNSIGNED_SHORT, 0);


    // bottom for sphere2
    let cube8_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, -4, -2, 0)
    glMatrix.mat4.translate(cube8_position, cube8_position, translateVec1);
    // scale
    glMatrix.mat4.scale(cube8_position, cube8_position, scaleVec2)
    gl.uniformMatrix4fv (program.uModelT, false, cube8_position);
    gl.bindVertexArray(myCube8.VAO);
    gl.drawElements(gl.TRIANGLES, myCube8.indices.length, gl.UNSIGNED_SHORT, 0);



    // draw cone
    gl.uniform1i (program.uTexType, 4);
    let cone_position = glMatrix.mat4.create();
    // translation
    var translateVec = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec, 0, -0.9, 4)
    glMatrix.mat4.translate(cone_position, cone_position, translateVec);
    // scale
    var scaleVec = glMatrix.vec3.create()
    glMatrix.vec3.set(scaleVec, 9, 5, 9)
    glMatrix.mat4.scale(cone_position, cone_position, scaleVec)
    gl.uniformMatrix4fv (program.uModelT, false, cone_position);
    gl.bindTexture(gl.TEXTURE_2D, brick2Texture);
    gl.bindVertexArray(myCone.VAO);
    gl.drawElements(gl.TRIANGLES, myCone.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.uniform1i (program.uTexType, 0);



    // middle bottom for ladder
    let cube3_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, 0, -3.3, -8)
    glMatrix.mat4.translate(cube3_position, cube3_position, translateVec1);
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 4, 0.2, 18);
    glMatrix.mat4.scale(cube3_position, cube3_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, cube3_position);
    gl.bindVertexArray(myCube3.VAO);
    gl.drawElements(gl.TRIANGLES, myCube3.indices.length, gl.UNSIGNED_SHORT, 0);

    // ladder1
    gl.uniform1i (program.uTexType, 4);
    let cube1_position = glMatrix.mat4.create();
    // rotate
    glMatrix.mat4.rotateX (cube1_position,  cube1_position, radians(-15.0))
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, 0, -0.25, -10.2)
    glMatrix.mat4.translate(cube1_position, cube1_position, translateVec1);
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 4, 0.2, 4);
    glMatrix.mat4.scale(cube1_position, cube1_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, cube1_position);
    gl.bindTexture(gl.TEXTURE_2D, brickTexture);
    gl.bindVertexArray(myCube1.VAO);
    gl.drawElements(gl.TRIANGLES, myCube1.indices.length, gl.UNSIGNED_SHORT, 0);

    // ladder2
    let cube2_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, 0, -2.38, -7)
    glMatrix.mat4.translate(cube2_position, cube2_position, translateVec1);
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 4, 0.2, 2);
    glMatrix.mat4.scale(cube2_position, cube2_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, cube2_position);
    gl.bindTexture(gl.TEXTURE_2D, brickTexture);
    gl.bindVertexArray(myCube2.VAO);
    gl.drawElements(gl.TRIANGLES, myCube2.indices.length, gl.UNSIGNED_SHORT, 0);

    // ladder3
    let cube10_position = glMatrix.mat4.create();
    // rotate
    glMatrix.mat4.rotateX (cube10_position,  cube10_position, radians(-15.0))
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, 0, -0.7, -5.4)
    glMatrix.mat4.translate(cube10_position, cube10_position, translateVec1);
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 4, 0.2, 3);
    glMatrix.mat4.scale(cube10_position, cube10_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, cube10_position);
    gl.bindTexture(gl.TEXTURE_2D, brickTexture);
    gl.bindVertexArray(myCube10.VAO);
    gl.drawElements(gl.TRIANGLES, myCube10.indices.length, gl.UNSIGNED_SHORT, 0);

    // ladder4
    let cube11_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, 0, -1.9, 0)
    glMatrix.mat4.translate(cube11_position, cube11_position, translateVec1);
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 4, 0.2, 6.5);
    glMatrix.mat4.scale(cube11_position, cube11_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, cube11_position);
    gl.bindTexture(gl.TEXTURE_2D, brickTexture);
    gl.bindVertexArray(myCube11.VAO);
    gl.drawElements(gl.TRIANGLES, myCube11.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.uniform1i (program.uTexType, 0);



    // left teapot
    gl.uniform1i (program.uTexType, 3);
    let teapot1_pos = glMatrix.mat4.create();
    // translate
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, 4, -1, -7)
    glMatrix.mat4.translate(teapot1_pos, teapot1_pos, translateVec1);
    // drawing the teapot rotating around Y  180 degrees
    glMatrix.mat4.rotateY (teapot1_pos,  teapot1_pos, radians(180.0))
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 0.5, 1, 0.5);
    glMatrix.mat4.scale(teapot1_pos, teapot1_pos, scaleVec3);
    // send the model matrix to the shader and draw.
    gl.uniformMatrix4fv (program.uModelT, false, teapot1_pos);
    gl.bindVertexArray(teapot1.VAO);
    gl.drawElements(gl.TRIANGLES, teapot1.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.uniform1i (program.uTexType, 0);

    // left bottom for teapot
    let cube6_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, 4, -2, -7)
    glMatrix.mat4.translate(cube6_position, cube6_position, translateVec1);
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 2.5, 2, 2.5);
    glMatrix.mat4.scale(cube6_position, cube6_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, cube6_position);
    gl.bindVertexArray(myCube6.VAO);
    gl.drawElements(gl.TRIANGLES, myCube6.indices.length, gl.UNSIGNED_SHORT, 0);


    // right teapot
    gl.uniform1i (program.uTexType, 3);
    let teapot2_pos = glMatrix.mat4.create();
    // translate
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, -4, -1, -7)
    glMatrix.mat4.translate(teapot2_pos, teapot2_pos, translateVec1);
    // drawing the teapot rotating around Y  180 degrees
    glMatrix.mat4.rotateY (teapot2_pos,  teapot2_pos, radians(0.0))
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 0.5, 1, 0.5);
    glMatrix.mat4.scale(teapot2_pos, teapot2_pos, scaleVec3);
    // send the model matrix to the shader and draw.
    gl.uniformMatrix4fv (program.uModelT, false, teapot2_pos);
    gl.bindVertexArray(teapot2.VAO);
    gl.drawElements(gl.TRIANGLES, teapot2.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.uniform1i (program.uTexType, 0);

    // right bottom for teapot
    let cube9_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, -4, -2, -7)
    glMatrix.mat4.translate(cube9_position, cube9_position, translateVec1);
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 2.5, 2, 2.5);
    glMatrix.mat4.scale(cube9_position, cube9_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, cube9_position);
    gl.bindVertexArray(myCube9.VAO);
    gl.drawElements(gl.TRIANGLES, myCube9.indices.length, gl.UNSIGNED_SHORT, 0);


    // platform
    gl.uniform1i (program.uTexType, 1);
    let table_position = glMatrix.mat4.create();
    // scale
    glMatrix.mat4.scale(table_position, table_position, scaleVec1)
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, 0, -12, 0)
    glMatrix.mat4.translate(table_position, table_position, translateVec1);
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 9, 1, 14);
    glMatrix.mat4.scale(table_position, table_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, table_position);
    gl.bindTexture(gl.TEXTURE_2D, platTexture);
    gl.bindVertexArray(table.VAO);
    gl.drawElements(gl.TRIANGLES, table.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.uniform1i (program.uTexType, 0);


    // small cube1
    gl.uniform1i (program.uTexType, 3);
    let smallCube1_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, 1.5, -3, -16)
    glMatrix.mat4.translate(smallCube1_position, smallCube1_position, translateVec1);
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 0.2, 1, 0.2);
    glMatrix.mat4.scale(smallCube1_position, smallCube1_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, smallCube1_position);
    gl.bindVertexArray(smallCube1.VAO);
    gl.drawElements(gl.TRIANGLES, smallCube1.indices.length, gl.UNSIGNED_SHORT, 0);

    // small cube2
    let smallCube2_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, 1.5, -3, -14)
    glMatrix.mat4.translate(smallCube2_position, smallCube2_position, translateVec1);
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 0.2, 1, 0.2);
    glMatrix.mat4.scale(smallCube2_position, smallCube2_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, smallCube2_position);
    gl.bindVertexArray(smallCube2.VAO);
    gl.drawElements(gl.TRIANGLES, smallCube2.indices.length, gl.UNSIGNED_SHORT, 0);

    // small cube3
    let smallCube3_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, 1.5, -3, -12)
    glMatrix.mat4.translate(smallCube3_position, smallCube3_position, translateVec1);
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 0.2, 1, 0.2);
    glMatrix.mat4.scale(smallCube3_position, smallCube3_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, smallCube3_position);
    gl.bindVertexArray(smallCube3.VAO);
    gl.drawElements(gl.TRIANGLES, smallCube3.indices.length, gl.UNSIGNED_SHORT, 0);

    // small cube4
    let smallCube4_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, -1.5, -3, -16)
    glMatrix.mat4.translate(smallCube4_position, smallCube4_position, translateVec1);
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 0.2, 1, 0.2);
    glMatrix.mat4.scale(smallCube4_position, smallCube4_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, smallCube4_position);
    gl.bindVertexArray(smallCube4.VAO);
    gl.drawElements(gl.TRIANGLES, smallCube4.indices.length, gl.UNSIGNED_SHORT, 0);

    // small cube5
    let smallCube5_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, -1.5, -3, -14)
    glMatrix.mat4.translate(smallCube5_position, smallCube5_position, translateVec1);
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 0.2, 1, 0.2);
    glMatrix.mat4.scale(smallCube5_position, smallCube5_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, smallCube5_position);
    gl.bindVertexArray(smallCube5.VAO);
    gl.drawElements(gl.TRIANGLES, smallCube5.indices.length, gl.UNSIGNED_SHORT, 0);

    // small cube6
    let smallCube6_position = glMatrix.mat4.create();
    var translateVec1 = glMatrix.vec3.create();
    glMatrix.vec3.set(translateVec1, -1.5, -3, -12)
    glMatrix.mat4.translate(smallCube6_position, smallCube6_position, translateVec1);
    // scale
    var scaleVec3 = glMatrix.vec3.create();
    glMatrix.vec3.set(scaleVec3, 0.2, 1, 0.2);
    glMatrix.mat4.scale(smallCube6_position, smallCube6_position, scaleVec3)
    gl.uniformMatrix4fv (program.uModelT, false, smallCube6_position);
    gl.bindVertexArray(smallCube6.VAO);
    gl.drawElements(gl.TRIANGLES, smallCube6.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.uniform1i (program.uTexType, 0);
    }


  //
  // Use this function to create all the programs that you need
  // You can make use of the auxillary function initProgram
  // which takes the name of a vertex shader and fragment shader
  //
  // Note that after successfully obtaining a program using the initProgram
  // function, you will beed to assign locations of attribute and unifirm variable
  // based on the in variables to the shaders.   This will vary from program
  // to program.
  //
  function initPrograms() {
    program = initProgram("wireframe-V", "wireframe-F")

    // Use this program instance
    gl.useProgram(program);
    // We attach the location of these shader values to the program instance
    // for easy access later in the code
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aUV = gl.getAttribLocation(program, 'aUV');
    program.aBary = gl.getAttribLocation(program, 'bary');
    program.uModelT = gl.getUniformLocation (program, 'modelT');
    program.uViewT = gl.getUniformLocation (program, 'viewT');
    program.uProjT = gl.getUniformLocation (program, 'projT');
    program.uTheTexture = gl.getUniformLocation (program, 'theTexture');
    program.uTexType = gl.getUniformLocation(program, 'texType');
    program.uTheta = gl.getUniformLocation (program, 'theta');
  }


  // creates a VAO and returns its ID
  function bindVAO (shape, program) {
      //create and bind VAO
      let theVAO = gl.createVertexArray();
      gl.bindVertexArray(theVAO);
      
      // create and bind vertex buffer
      let myVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aVertexPosition);
      gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
      
      // add code for any additional vertex attribute
      let myBaryBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myBaryBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.bary), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aBary);
      gl.vertexAttribPointer(program.aBary, 3, gl.FLOAT, false, 0, 0);

      let uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aUV);
      gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);
      
      // Setting up the IBO
      let myIndexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

      // Clean
      gl.bindVertexArray(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      
      return theVAO;
  }


/////////////////////////////////////////////////////////////////////////////
//
//  You shouldn't have to edit anything below this line...but you can
//  if you find the need
//
/////////////////////////////////////////////////////////////////////////////

// Given an id, extract the content's of a shader script
// from the DOM and return the compiled shader
function getShader(id) {
  const script = document.getElementById(id);
  const shaderString = script.text.trim();

  // Assign shader depending on the type of shader
  let shader;
  if (script.type === 'x-shader/x-vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER);
  }
  else if (script.type === 'x-shader/x-fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  }
  else {
    return null;
  }

  // Compile the shader using the supplied shader code
  gl.shaderSource(shader, shaderString);
  gl.compileShader(shader);

  // Ensure the shader is valid
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}


  //
  // compiles, loads, links and returns a program (vertex/fragment shader pair)
  //
  // takes in the id of the vertex and fragment shaders (as given in the HTML file)
  // and returns a program object.
  //
  // will return null if something went wrong
  //
  function initProgram(vertex_id, fragment_id) {
    const vertexShader = getShader(vertex_id);
    const fragmentShader = getShader(fragment_id);

    // Create a program
    let program = gl.createProgram();
      
    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
      return null;
    }
      
    return program;
  }


  //
  // We call draw to render to our canvas
  //
  function draw() {
    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
    // draw your shapes
    drawShapes();

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  // Entry point to our application
  function init() {
      
    // Retrieve the canvas
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) {
      console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
      return null;
    }

    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);

    // Retrieve a WebGL context
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`There is no WebGL 2.0 context`);
        return null;
      }
      
    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);
      
    // Set the clear color to be black
    gl.clearColor(0, 0, 0, 1);
      
    // some GL initialization
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)

    // Read, compile, and link your shaders
    initPrograms();
    
    // create and bind your current object
    createShapes();

    // set up your textures
    setUpTextures();

    // set up the camera
    setUpCamera(program);
    
    // do a draw
    draw();
  }
