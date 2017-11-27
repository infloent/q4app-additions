var fs = require('fs'),
    highlight = require('../node_modules/highlight.js').highlight,
    marked = require('../node_modules/marked'),
    mustache = require('../node_modules/mustache');

function parse_markdown_link(link) {
    var m = link.match(/\[(.*)\]\((.*)\)/);
    return {
        name: m[1].replace(/_/g, ' '),
        url: m[2]
    };
}

function format_value(value) {
    if (typeof value == 'string') return value;
    if (typeof value == 'boolean' || typeof value == 'number') return value.toString();
    return value;
}

function highlight_js(code) {
    return highlight('js', code).value;
}

function highlight_html(code) {
    return highlight('html', code).value;
}

function captioned_example(example) {
    var m = example.match(/^(?:([\s\S]*?)\s*\n---\n\s*)?([\s\S]*)$/);
    return {
        caption: marked(m[1] || ''),
        code: highlight_html(m[2])
    };
}

function stringify_type(param) {
    if ('type' in param) param.type = param.type.names.join('/');
    return param;
}

function single_line(example) {
    return example.indexOf('\n') == -1;
}

function multi_line(example) {
    return example.indexOf('\n') > -1;
}

function classType(doclet, type) {
    return 'type' in doclet && doclet.type.names.indexOf(type.toLowerCase()) > -1 && (doclet.augments || []).length ? true : false;
}

exports.publish = function(data, opts) {
    var classes = {};

    data().get().forEach(function(doclet) {
        if (doclet.undocumented) return;

        var path = doclet.longname.split('.'),
            clss = path.slice(0, 2).join('.');

        if (path.length == 2 && doclet.kind == 'class') {
            classes[clss] = {
                name: clss,
                description: doclet.description,
                version: doclet.version,
                extendsWidget: classType(doclet, 'widget'),
                extendsObject: classType(doclet, 'object'),
                file: doclet.meta.filename,
                latest: doclet.meta.filename.replace(/js$/, '' + 'min.js'),
                distfile: doclet.meta.filename.replace(/js$/, doclet.version + '.min.js'),
                line: doclet.meta.lineno,
                author: doclet.author,
                examples: (doclet.examples || []).map(captioned_example),
                tutorials: (doclet.tutorials || []).map(parse_markdown_link),
                options: [],
                methods: [],
                methodsOptions: [],
                requires: (doclet.requires || []).map(parse_markdown_link),
                abstract: doclet.virtual,
                extends: doclet.augments || [],
                children: []
            };
        }

        // option
        if (path.length == 4 && (path[2] == 'options' || path[2] == '_options')) {
            classes[clss].options.push({
                name: doclet.name,
                description: doclet.description,
                line: doclet.meta.lineno,
                type: 'type' in doclet ? doclet.type.names : [],
                params: (doclet.params || []).map(function(param) {
                    if ('type' in param) param.type = param.type.names.join('/');
                    param.optionParamName = param.name;
                    param.optionParamDescription = param.description;
                    return param;
                }),
                defaultval: ((doclet.defaultvalue !== undefined && doclet.defaultvalue !== null && doclet.defaultvalue.toString().indexOf("\n") == -1) ?
                    highlight_js(format_value(doclet.defaultvalue)) : null),
                defaultvals: ((doclet.defaultvalue !== undefined && doclet.defaultvalue !== null && doclet.defaultvalue.toString().indexOf("\n") > -1) ?
                    highlight_js(format_value(doclet.defaultvalue)) : null),
                examples: (doclet.examples || []).filter(single_line).map(highlight_js),
                exblocks: (doclet.examples || []).filter(multi_line).map(highlight_js),
                returns: (doclet.returns || []),
                required: doclet.requiredvalue
            });
        }

        // method
        if (path.length == 3 && doclet.kind == 'function' && doclet.name.charAt(0) != '_') {
            classes[clss].methods.push({
                name: doclet.name,
                description: doclet.description,
                type: 'type' in doclet ? doclet.type.names : [],
                line: doclet.meta.lineno,
                params: (doclet.params || []).map(function(param, name, description) {
                    if ('type' in param) param.type = param.type.names.join('/');
                    param.methodParamName = param.name;
                    param.methodParamDescription = param.description;
                    return param;
                }),
                examples: (doclet.examples || []).filter(single_line),
                exblocks: (doclet.examples || []).filter(multi_line),
                returns: (doclet.returns || []),
                required: doclet.required,
                optionsForMethod: []
            });
        }

        //methods options
        if (path.length == 5 && (path[3] == 'options' || path[3] == '_options')) {
            classes[clss].methodsOptions.push({
                methodName: path[2],
                optionName: doclet.name,
                optionDescription: doclet.description,
                optionLine: doclet.meta.lineno,
                optionType: 'type' in doclet ? doclet.type.names : [],
                optionParams: (doclet.params || []).map(function(param, name, description) {
                    if ('type' in param) param.type = param.type.names.join('/');
                    param.methodOptParamName = param.name;
                    param.methodOptParamDescription = param.description;
                    return param;
                }),
                optionDefaultval: ((doclet.defaultvalue !== undefined && doclet.defaultvalue !== null && doclet.defaultvalue.toString().indexOf("\n") == -1) ?
                    highlight_js(format_value(doclet.defaultvalue)) : null),
                optionDefaultvals: ((doclet.defaultvalue !== undefined && doclet.defaultvalue !== null && doclet.defaultvalue.toString().indexOf("\n") > -1) ?
                    highlight_js(format_value(doclet.defaultvalue)) : null),
                optionExamples: (doclet.examples || []).filter(single_line).map(highlight_js),
                optionExblocks: (doclet.examples || []).filter(multi_line).map(highlight_js),
                optionReturns: (doclet.returns || []),
                optionRequired: doclet.requiredvalue

            });
        }
    });

    for (var clss in classes) {
        classes[clss].extends.forEach(function(parent) {
            // add reference to parent class
            classes[parent].children.push(clss);
            //inherit version and dist file from parent
            if (parent !== "q4.defaults") {

                if (typeof classes[clss].version == "undefined") {
                    classes[clss].distfile = classes[parent].distfile;
                    classes[clss].version = classes[parent].version;

                }

            }

        });

        //parse methods
        classes[clss].methods.forEach(function(method) {
            //parse methodsOptions
            classes[clss].methodsOptions.forEach(function(methodOption) {

                if (method.name == methodOption.methodName) {
                    method.optionsForMethod.push(methodOption);
                }
            });
        });
    }

    var classlist = Object.keys(classes).sort().map(function(clss) {
        return classes[clss];
    });

    // render template for each class
    var layoutTemplate = fs.readFileSync('jsdoc_template/layout.html.mustache', 'utf-8'),
        indexTemplate = fs.readFileSync('jsdoc_template/index.html.mustache', 'utf-8'),
        pageTemplate = fs.readFileSync('jsdoc_template/doc.html.mustache', 'utf-8');

    fs.writeFileSync(opts.destination + '/index.html', mustache.render(layoutTemplate, {
        classes: classlist,
        content: mustache.render(indexTemplate, {
            classes: classlist
        })
    }), 'utf8');
    console.log(classlist);
    classlist.forEach(function(clss) {
        fs.writeFileSync(opts.destination + '/' + clss.name + '.html', mustache.render(layoutTemplate, {
            classes: classlist,
            content: mustache.render(pageTemplate, clss)
        }), 'utf8');
    });
};

