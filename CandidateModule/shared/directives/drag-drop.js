angular
  .module('CandidateOnBoarding')
  .directive('dragMe', dragMe)
  .directive('dragMeNew', dragMeNew)
  .directive('dropOnMe', dropOnMe);

dragMe.$inject = [];

function dragMe() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.prop('draggable', true);
      element.on('dragstart', function(event) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text', event.target.id);
      });
    }
  };

}

dragMeNew.$inject = [];

function dragMeNew() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      attrs.$observe('dissableit', function (newVal, oldVal) {
        if(newVal == 'true'){
          element.prop('draggable', false);
          element.off('dragstart');
        } else {          
          element.prop('draggable', true);
          element.on('dragstart', function(event) {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text', event.target.id);
          });
        }
      })
    }
  };

}
dropOnMe.$inject = [];
function dropOnMe() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on('dragover', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var step = event.target.id;
        if (!step) 
          event.dataTransfer.dropEffect = 'none';
        else 
          step = step.split('-');
          
        if (step[0] == 'id' ||
            step[0] == 'idi' ||
            step[0] == 'stepIcons' ||
            step[0] == 'idel' || 
            step[0] == 'idoc' ||
            step[0] == 'idoctxt' || 
            step[0] == 'ideli' ||
            step[0] == 'iedit' ||
            step[0] == 'iediti' ||
            step[0] == 'iclear' || 
            step[0] == 'seq') 
            event.dataTransfer.dropEffect = 'none';
      });
      element.on('drop', function(event) {
        event.preventDefault();
        var dropzone = document.getElementById('small-drop-zone');
        if (dropzone) dropzone.style.backgroundImage = 'none';
      });
    }
  };
}
