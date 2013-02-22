describe('Jasmine Helper', function() {
  describe('clean', function() {
    it ('has true as default', function() {
      // given
      var cleanValue = clean;

      // when
      var isTrue = clean === true;

      // then
      expect(isTrue).toBeTruthy();
    });
  });

  describe('methods', function() {
    describe('#append', function() {
      it ('appends the content to the fixtury element', function() {
        // given
        var input = Helper.text({});

        // when
        var element = Helper.append(input);

        // then
        expect($('.fixtury').children('input')).toExist();
      });
    });

    describe('#checkbox', function() {
      it ('creates a the checkbox', function() {
        // given
        var options = {};

        // when
        var element = Helper.checkbox(options);

        // then
        expect(element).toEqual('<input type="checkbox" />');
      });

      context('with type attribute', function() {
        it ('fails with exception', function() {
          // given
          var options = { type: 'text' };

          // when
          var proc = function() { Helper.checkbox(options); };

          // then
          expect(proc).toThrow(new Error('You cannot set the "type" using an alias!'));
        });
      });
    });

    describe('#clear', function() {
      context('with clean as false', function() {
        beforeEach(function() { clean = false; });

        it ('will not be executed', function() {
          // given
          var container = $('.fixtury').html('text');

          // when
          Helper.clear();

          // then
          expect(container).toHaveHtml('text');
        });
      });

      context('with clean as true', function() {
        beforeEach(function() { clean = true; });

        it ('will be executed', function() {
          clean = true;

          // given
          var container = $('.fixtury').html('text');

          // when
          Helper.clear();

          // then
          expect(container).toBeEmpty();
        });
      });
    });

    describe('#checks', function() {
      context('checked', function() {
        context('true', function() {
          context('with checkbox', function() {
            it ('is checked', function() {
              // given
              var tag = '<input type="checkbox" />';

              // when
              var element = Helper._checks(tag, { checked: true });

              // then
              expect(element).toEqual('<input type="checkbox" checked="checked" />');
            });
          });

          context('without checkbox', function() {
            it ('raise exception', function() {
              // given
              var tag = '<input type="radio" />';

              // when
              var proc = function() { Helper._checks(tag, { checked: true }); };

              // then
              expect(proc).toThrow(new Error('You can check just checkbox element!'));
            });
          });
        });
      });

      context('selected', function() {
        context('true', function() {
          context('with radio', function() {
            it ('is selected', function() {
              // given
              var tag = '<input type="radio" />';

              // when
              var element = Helper._checks(tag, { selected: true });

              // then
              expect(element).toEqual('<input type="radio" selected="selected" />');
            });
          });

          context('with option', function() {
            it ('is selected', function() {
              // given
              var tag = '<option></option>';

              // when
              var element = Helper._checks(tag, { selected: true });

              // then
              expect(element).toEqual('<option selected="selected"></option>');
            });
          });

          context('without radio and option', function() {
            it ('raise exception', function() {
              // given
              var tag = '<input type="checkbox" />';

              // when
              var proc = function() { Helper._checks(tag, { selected: true }); };

              // then
              expect(proc).toThrow(new Error('You can select just radio and option element!'));
            });
          });
        });
      });
    });

    describe('#context', function() {
      it ('works', function() {
        expect(true).toBeTruthy();
      });
    });

    describe('#data', function() {
      it ('includes the attributes', function() {
        // given
        var options = { a: 'a' };

        // when
        var extracted = Helper._data(options);

        // then
        expect(extracted).toEqual({ attributes: 'a="a"', html: '', checked: false, selected: false, times: 1 });
      });

      it ('includes the times', function() {
        // given
        var options = { times: 2 };

        // when
        var extracted = Helper._data(options);

        // then
        expect(extracted).toEqual({ attributes: '', html: '', checked: false, selected: false, times: 2 });
      });

      it ('includes the selected', function() {
        // given
        var options = { selected: true };

        // when
        var extracted = Helper._data(options);

        // then
        expect(extracted).toEqual({ attributes: '', html: '', checked: false, selected: true, times: 1 });
      });

      it ('includes the checked', function() {
        // given
        var options = { checked: true };

        // when
        var extracted = Helper._data(options);

        // then
        expect(extracted).toEqual({ attributes: '', html: '', checked: true, selected: false, times: 1 });
      });
    });

    describe('#double', function() {
      it ('creates a double tag element', function() {
        // given
        var options = { double: 'double' };

        // when
        var element = Helper.double(options, 'name');

        // then
        expect(element).toEqual('<name double="double"></name>');
      });

      context('with no hash given', function() {
        it ('creates a single tag element normally', function() {
          // given
          var options = undefined;

          // when
          var element = Helper.double(options, 'name');

          // then
          expect(element).toEqual('<name></name>');
        });
      });
    });

    describe('#form', function() {
      it ('is created', function() {
        // given
        var options = {};

        // when
        var element = Helper.form(options);

        // then
        expect(element).toEqual('<form></form>');
      });

      context('with html', function() {
        it ('is appended', function() {
          // given
          var options = { html: Helper.input({ name: 'name' }) };

          // when
          var element = Helper.form(options);

          // then
          expect(element).toEqual('<form><input name="name" /></form>');
        });
      });
    });

    describe('#getHtml', function() {
      context('without html', function() {
        it ('return empty', function() {
          // given
          var options = {};

          // when
          var html = Helper._getHtml(options);

          // then
          expect(html).toEqual('');
        });
      });

      context('with one html', function() {
        it ('is appended', function() {
          // given
          var options = { html: 'html' };

          // when
          var html = Helper._getHtml(options);

          // then
          expect(html).toEqual('html');
        });
      });

      context('with array of htmls', function() {
        it ('is appended', function() {
          // given
          var options = { html: ['a', 'b']  };

          // when
          var html = Helper._getHtml(options);

          // then
          expect(html).toEqual('ab');
        });
      });
    });

    describe('#getSelected', function() {
      context('without selected', function() {
        it ('is false', function() {
          // given
          var options = {};

          // when
          var selected = Helper._getHtml(options);

          // then
          expect(selected).toBeFalsy();
        });
      });

      context('with selected', function() {
        it ('is true', function() {
          // given
          var options = { selected: true };

          // when
          var selected = Helper._getSelected(options);

          // then
          expect(selected).toBeTruthy();
        });
      });
    });

    describe('#getTimes', function() {
      context('without times present', function() {
        it ('will returns 1', function() {
          // given
          var options = {};

          // when
          var times = Helper._getTimes(options);

          // then
          expect(times).toEqual(1);
        });
      });

      context('with times present', function() {
        it ('will returns the times value', function() {
          // given
          var options = { times: 2 };

          // when
          var times = Helper._getTimes(options);

          // then
          expect(times).toEqual(2);
        });
      });
    });

    describe('#input', function() {
      it ('creates a input with the given parameters', function() {
        // given
        var options = { type: 'text', name: 'name', times: 2 };

        // when
        var element = Helper.input(options);

        // then
        expect(element).toEqual('<input type="text" name="name" /><input type="text" name="name" />');
      });
    });

    describe('#normalize', function() {
      it ('removes the time attribute from the options', function() {
        // given
        var options = { a: 'a', times: 1 };

        // when
        var normalized = Helper._normalize(options);

        // then
        expect(normalized).toEqual({ a: 'a' });
      });

      it ('removes the html attribute from the options', function() {
        // given
        var options = { a: 'a', html: 'html' };

        // when
        var normalized = Helper._normalize(options);

        // then
        expect(normalized).toEqual({ a: 'a' });
      });

      it ('removes the selected attribute from the options', function() {
        // given
        var options = { a: 'a', selected: true };

        // when
        var normalized = Helper._normalize(options);

        // then
        expect(normalized).toEqual({ a: 'a' });
      });

      it ('removes the checked attribute from the options', function() {
        // given
        var options = { a: 'a', checked: true };

        // when
        var normalized = Helper._normalize(options);

        // then
        expect(normalized).toEqual({ a: 'a' });
      });
    });

    describe('#option', function() {
      it ('creates the option', function() {
        // given
        var options = { value: 'value', html: 'Label' };

        // when
        var element = Helper.option(options);

        // then
        expect(element).toEqual('<option value="value">Label</option>');
      });

      context('with type attribute', function() {
        it ('fails with exception', function() {
          // given
          var options = { type: 'text' };

          // when
          var proc = function() { Helper.radio(options); };

          // then
          expect(proc).toThrow(new Error('You cannot set the "type" using an alias!'));
        });
      });
    });

    describe('#radio', function() {
      it ('creates a the radio', function() {
        // given
        var options = {};

        // when
        var element = Helper.radio(options);

        // then
        expect(element).toEqual('<input type="radio" />');
      });

      context('with type attribute', function() {
        it ('fails with exception', function() {
          // given
          var options = { type: 'text' };

          // when
          var proc = function() { Helper.radio(options); };

          // then
          expect(proc).toThrow(new Error('You cannot set the "type" using an alias!'));
        });
      });
    });

    describe('#parameterize', function() {
      it ('parameterizes the key values as element attributes', function() {
        // given
        var options = { a: 'a', b: 'b' };

        // when
        var params = Helper._parameterize(options);

        // then
        expect(params).toEqual('a="a" b="b"');
      });
    });

    describe('#repeat', function() {
      it ('repeats the given content the given times', function() {
        // given
        var content = 'a',
            times   = 3;

        // when
        var repeated = Helper._repeat(content, { times: times });

        // then
        expect(repeated).toEqual('aaa');
      });

      context('with {index}', function() {
        it ('sets the index', function() {
          // given
          var content = '<option name="option-{index}">{index}</option>',
              times   = 2;

          // when
          var repeated = Helper._repeat(content, { times: times });

          // then
          expect(repeated).toEqual('<option name="option-1">1</option><option name="option-2">2</option>');
        });
      });
    });

    describe('#select', function() {
      it ('is created', function() {
        // given
        var options = { name: 'name' };

        // when
        var element = Helper.select(options);

        // then
        expect(element).toEqual('<select name="name"></select>');
      });
    });

    describe('#single', function() {
      it ('creates a single tag element', function() {
        // given
        var options = { single: 'single' };

        // when
        var element = Helper.single(options, 'name');

        // then
        expect(element).toEqual('<name single="single" />');
      });

      context('with no hash given', function() {
        it ('creates a single tag element normally', function() {
          // given
          var options = undefined;

          // when
          var element = Helper.single(options, 'name');

          // then
          expect(element).toEqual('<name />');
        });
      });
    });

    describe('#text', function() {
      it ('creates a text field', function() {
        // given
        var options = {};

        // when
        var element = Helper.text(options);

        // then
        expect(element).toEqual('<input type="text" />');
      });

      context('with type attribute', function() {
        it ('fails with exception', function() {
          // given
          var options = { type: 'text' };

          // when
          var proc = function() { Helper.text(options); };

          // then
          expect(proc).toThrow(new Error('You cannot set the "type" using an alias!'));
        });
      });
    });

    describe('#verify', function() {
      context('with type attribute', function() {
        it ('fails with exception', function() {
          // given
          var options = { type: 'text' };

          // when
          var proc = function() { Helper._verify(options); };

          // then
          expect(proc).toThrow(new Error('You cannot set the "type" using an alias!'));
        });
      });
    });
  });
});
