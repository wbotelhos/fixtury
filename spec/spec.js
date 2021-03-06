describe('Fixtury', function() {
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
      afterEach(function() { Helper.clear(); });

      it ('appends the content to the fixtury element', function() {
        // given
        var input = Helper.text();

        // when
        Helper.append(input);

        // then
        expect($('.fixtury').children('input')).toExist();
      });

      it ('returns the appended element', function() {
        // given
        var input = Helper.text();

        // when
        var element = Helper.append(input);

        // then
        expect(element).toBe($('.fixtury').children('input'));
      });

      context('when placeholder has some content', function() {
        it ('appends without override all placeholder', function() {
          // given
          Helper.append(Helper.text());

          // when
          Helper.append(Helper.text());

          // then
          expect($('.fixtury')).toHaveHtml('<input type="text"><input type="text">');
        });
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
      context('with clean as true', function() {
        beforeEach(function() { clean = true; });

        context('without extra clear', function() {
          it ('will clears the fixture container', function() {
            // given
            var container = $('.fixtury').html('some');

            // when
            Helper.clear();

            // then
            expect(container).not.toHaveText('some');
          });
        });

        context('with extra clear', function() {
          context('as string', function() {
            it ('will removes the passed element', function() {
              // given
              var element = $('<div id="target"></div>'),
                  body    = $('body').append(element);

              // when
              Helper.clear('#target');

              // then
              expect(element).not.toExist();
            });
          });

          context('as string', function() {
            it ('will removes the passed element', function() {
              // given
              var element1 = $('<div id="target-1"></div>'),
                  element2 = $('<div id="target-2"></div>'),
                  body     = $('body').append(element1, element2);

              // when
              Helper.clear(['#target-1', '#target-2']);

              // then
              expect(element1).not.toExist();
              expect(element2).not.toExist();
            });
          });
        });
      });

      context('with clean as false', function() {
        beforeEach(function() { clean = false; });

        context('without extra clear', function() {
          it ('will clears the fixture container', function() {
            // given
            var container = $('.fixtury').html('some');

            // when
            Helper.clear();

            // then
            expect(container).toHaveText('some');
          });
        });

        context('with extra clear', function() {
          context('as string', function() {
            it ('will removes the passed element', function() {
              // given
              var element = $('<div id="target"></div>');

              $('body').append(element);

              // when
              Helper.clear('#target');

              // then
              expect(element).toExist();
            });
          });

          context('as string', function() {
            it ('will removes the passed element', function() {
              // given
              var element1 = $('<div id="target-1"></div>'),
                  element2 = $('<div id="target-2"></div>');

              $('body').append(element1, element2);

              // when
              Helper.clear(['#target-1', '#target-2']);

              // then
              expect(element1).toExist();
              expect(element2).toExist();
            });
          });
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
      context('using it', function() {
        it ('works', function() {
          expect(true).toBeTruthy();
        });
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

    describe('#fieldset', function() {
      it ('creates the fieldset', function() {
        // given
        var options = { value: 'value', html: 'html' };

        // when
        var element = Helper.fieldset(options);

        // then
        expect(element).toEqual('<fieldset value="value">html</fieldset>');
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

    describe('#hidden', function() {
      it ('creates a hidden field', function() {
        // given
        var options = {};

        // when
        var element = Helper.hidden(options);

        // then
        expect(element).toEqual('<input type="hidden" />');
      });

      context('with type attribute', function() {
        it ('fails with exception', function() {
          // given
          var options = { type: 'hidden' };

          // when
          var proc = function() { Helper.hidden(options); };

          // then
          expect(proc).toThrow(new Error('You cannot set the "type" using an alias!'));
        });
      });
    });

    describe('#html', function() {
      afterEach(function() { Helper.clear(); });

      it ('replaces all content with the given one', function() {
        // given
        Helper.append('init');

        // when
        var element = Helper.html('replaced');

        // then
        expect($('.fixtury')).toHaveHtml('replaced');
      });
    });

    describe('#input', function() {
      context('without the forced type', function() {
        it ('creates an input with the given parameters', function() {
          // given
          var options    = { type: 'text', name: 'name', times: 2 },
              forcedType = undefined;

          // when
          var element = Helper.input(options, forcedType);

          // then
          expect(element).toEqual('<input type="text" name="name" /><input type="text" name="name" />');
        });
      });

      context('with the forced type', function() {
        it ('creates a raw input', function() {
          // given
          var options    = {},
              forcedType = 'forced';

          // when
          var element = Helper.input(options, forcedType);

          // then
          expect(element).toEqual('<input type="forced" />');
        });
      });
    });

    describe('#label', function() {
      it ('creates the label', function() {
        // given
        var options = { value: 'value', html: 'html' };

        // when
        var element = Helper.label(options);

        // then
        expect(element).toEqual('<label value="value">html</label>');
      });
    });

    describe('#legend', function() {
      it ('creates the legend', function() {
        // given
        var options = { value: 'value', html: 'html' };

        // when
        var element = Helper.legend(options);

        // then
        expect(element).toEqual('<legend value="value">html</legend>');
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

    describe('#password', function() {
      it ('creates a password field', function() {
        // given
        var options = {};

        // when
        var element = Helper.password(options);

        // then
        expect(element).toEqual('<input type="password" />');
      });

      context('with type attribute', function() {
        it ('fails with exception', function() {
          // given
          var options = { type: 'password' };

          // when
          var proc = function() { Helper.password(options); };

          // then
          expect(proc).toThrow(new Error('You cannot set the "type" using an alias!'));
        });
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

    describe('#submit', function() {
      it ('creates a submit field', function() {
        // given
        var options = {};

        // when
        var element = Helper.submit(options);

        // then
        expect(element).toEqual('<input type="submit" />');
      });

      context('with type attribute', function() {
        it ('fails with exception', function() {
          // given
          var options = { type: 'submit' };

          // when
          var proc = function() { Helper.submit(options); };

          // then
          expect(proc).toThrow(new Error('You cannot set the "type" using an alias!'));
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

    describe('#textarea', function() {
      it ('creates a textarea field', function() {
        // given
        var options = { html: 'html' };

        // when
        var element = Helper.textarea(options);

        // then
        expect(element).toEqual('<textarea>html</textarea>');
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

      context('with undefined hash', function() {
        it ('ignores the verifications', function() {
          // given
          var options = undefined;

          // when
          var proc = function() { Helper._verify(options); };

          // then
          expect(proc).not.toThrow(new Error('options is undefined'));
        });
      });
    });
  });
});
