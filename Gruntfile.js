/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            /*
            Change these:
            
            width: ,
            suffix: ,
            quality:
            */
	   width: 270,
           quality: 30
          },
	  {
           name: "lg",
   	   suffix: "_2x",
	   width: 800,
	   quality: 60
          },
	  {
           name: "lg",
	   width: 400,
	   quality: 60
          },
	  {
           name: "sm",
   	   suffix: "_2x",
	   width: 400,
           quality: 60
          },
	  {
           name: "sm",
	   width: 200,
           quality: 60
          },
          {
           name: "md",
   	   suffix: "_2x",
	   width: 600,
	   quality: 60
          },
          {
           name: "md",
	   width: 300,
	   quality: 60
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images/',
          dest: 'img/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['img'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['img']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the img directory */
    copy: {
      dev: {
        files: [{
          expand: true, 
          flatten: true,
          src: 'images/*.{gif,jpg,png}',
          dest: 'img/'
        }]
      },
    },
  });
  
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);

};
