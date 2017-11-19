(function () {
  'use strict';

  describe('Libraries Route Tests', function () {
    // Initialize global variables
    var $scope,
      LibrariesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _LibrariesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      LibrariesService = _LibrariesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('libraries');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/libraries');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          LibrariesController,
          mockLibrary;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('libraries.view');
          $templateCache.put('modules/libraries/client/views/view-library.client.view.html', '');

          // create mock Library
          mockLibrary = new LibrariesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Library Name'
          });

          // Initialize Controller
          LibrariesController = $controller('LibrariesController as vm', {
            $scope: $scope,
            libraryResolve: mockLibrary
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:libraryId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.libraryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            libraryId: 1
          })).toEqual('/libraries/1');
        }));

        it('should attach an Library to the controller scope', function () {
          expect($scope.vm.library._id).toBe(mockLibrary._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/libraries/client/views/view-library.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          LibrariesController,
          mockLibrary;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('libraries.create');
          $templateCache.put('modules/libraries/client/views/form-library.client.view.html', '');

          // create mock Library
          mockLibrary = new LibrariesService();

          // Initialize Controller
          LibrariesController = $controller('LibrariesController as vm', {
            $scope: $scope,
            libraryResolve: mockLibrary
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.libraryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/libraries/create');
        }));

        it('should attach an Library to the controller scope', function () {
          expect($scope.vm.library._id).toBe(mockLibrary._id);
          expect($scope.vm.library._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/libraries/client/views/form-library.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          LibrariesController,
          mockLibrary;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('libraries.edit');
          $templateCache.put('modules/libraries/client/views/form-library.client.view.html', '');

          // create mock Library
          mockLibrary = new LibrariesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Library Name'
          });

          // Initialize Controller
          LibrariesController = $controller('LibrariesController as vm', {
            $scope: $scope,
            libraryResolve: mockLibrary
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:libraryId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.libraryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            libraryId: 1
          })).toEqual('/libraries/1/edit');
        }));

        it('should attach an Library to the controller scope', function () {
          expect($scope.vm.library._id).toBe(mockLibrary._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/libraries/client/views/form-library.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
