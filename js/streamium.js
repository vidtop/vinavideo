var _ready_funcs = [];
function _page_reload(){
    _.parallel(_ready_funcs);
}
function _page_ready(fn){
    _ready_funcs.push(function(cb){
	fastdom.mutate(
            function() {
		fn(jQuery);
		cb();
            });
    });
}
function Streamium() {
    var b = jQuery.noConflict();
    return b(".subscriptio_list_product a").contents().unwrap(), b(".product-name a").contents().unwrap(), b(".subscriptio_frontend_items_list_item a").contents().unwrap(), b(".subscriptio_list_id a").contents().unwrap(), b(".product-thumbnail").remove(), b(".widget > ul").addClass("list-group"), b(".widget > ul > li").addClass("list-group-item"), b(".widget").fadeIn(), {
        setCount: 6,
        lazy: {
            throttle: 500,
            visibleOnly: !0,
            effect: "fadeIn",
            effectTime: 500
        },
        slick: {
            adaptiveHeight: !0,
            infinite: !1,
            responsive: [{
                breakpoint: 480,
                settings: {
                    appendArrows: !1,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }]
        },
        slickSeries: {
            adaptiveHeight: !0,
            responsive: [{
                breakpoint: 480,
                settings: {
                    appendArrows: !1,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }]
        },
        init: function(a) {
            "lg" !== this.findBootstrapEnvironment() && "md" !== this.findBootstrapEnvironment() || (this.setCount = parseInt(streamium_object.tile_count), b(window).scroll(b.throttle(250, this.throttleScroll))), "sm" === this.findBootstrapEnvironment() && (this.setCount = 4), "xs" === this.findBootstrapEnvironment() && (this.setCount = 2), this.slick.slidesToShow = this.setCount, this.slick.slidesToScroll = this.setCount, this.slickSeries.slidesToShow = this.setCount - 1, this.slickSeries.slidesToScroll = this.setCount - 1
        },
        isOdd: function(a) {
            return a % 2
        },
        throttleScroll: function(a) {
            if (b("body").hasClass("home")) {
                b(window).scrollTop() >= 50 ? (b("body").addClass("nav-is-fixed"), b(".cd-main-content").css("top", "70px")) : (b("body").removeClass("nav-is-fixed"), b(".cd-main-content").css("top", "0px"))
            }
        },
        limitWords: function(a, b, c) {
            var d = "",
                e = a.replace(/\s+/g, " "),
                f = e.split(" "),
                g = f.length,
                h = 0;
            if (g > b) {
                for (h = 0; h < b; h++) d = d + " " + f[h] + " ";
                return d + (c || "...")
            }
            return a
        },
        findBootstrapEnvironment: function() {
            var a = ["xs", "sm", "md", "lg"],
                c = b("<div>");
            c.appendTo(b("body"));
            for (var d = a.length - 1; d >= 0; d--) {
                var e = a[d];
                if (c.addClass("hidden-" + e), c.is(":hidden")) return c.remove(), e
            }
        },
        isMobile: {
            Android: function() {
                return navigator.userAgent.match(/Android/i)
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i)
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i)
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i)
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
            },
            any: function() {
                return this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows()
            }
        },
        getData: function(a, c) {
            a.query = streamium_object.query, a.search = streamium_object.search;
	    switch(a.action){
	    case 'streamium_get_more_content':
	    case 'streamium_get_dynamic_series_content':
		_url = [streamium_object.ajax_url, a.action, a.post_id, a.postId].filter(function(e){return e}).join('/') + '.json';
		break;
	    default:
		_url = [streamium_object.ajax_url, a.action, a.post_id, a.postId, a.query && a.query['name']?a.query['name'].toLowerCase():null].filter(function(e){return e}).join('/') + '.json';
	    }
	    b.ajax({
                type:"get" ||  "post",
                dataType: "json",
                url: _url,
                data: a,
		crossDomain: true,
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                success: function(a) {
                    c(a)
                }
            })
        },
        caroTileTemplate: function(a, b, c) {
            var d = "";
            a[b].paid && (d = a[b].paid.html);
            var e = "";
            return 0 === b ? e = "far-left" : b === streamium_object.tile_count - 1 && (e = "far-right"), '<div class="tile ' + e + '" data-id="' + a[b].id + '" data-nonce="' + a[b].nonce + '" data-cat="' + c + '"><div class="tile_inner-spacer"><div class="tile_inner tile_inner-home lazy" data-src="' + a[b].tileUrl + '">' + d + '<div id="tile-white-selected-' + c + "-" + a[b].id + '" class="tile-white-selected"></div><div class="content"><div class="overlay lazy" data-src="' + a[b].tileUrlExpanded + '"><div class="overlay-gradient"></div><a class="play-icon-wrap hidden-xs" href="' + a[b].link + '"><div class="play-icon-wrap-rel"><div class="play-icon-wrap-rel-ring"></div><span class="play-icon-wrap-rel-play"><i class="fa fa-play fa-1x brand-color" aria-hidden="true"></i></span></div></a><div class="overlay-meta hidden-xs"><span class="top-meta-watched">' + (a[b].progressBar > 0 ? a[b].progressBar + "% watched" : "") + "</span><h4>" + a[b].title + "</h4><p>" + a[b].text + '</p><span class="top-meta-reviews">' + a[b].reviews + '</span><a data-id="' + a[b].post_id + '" data-nonce="' + a[b].nonce + '" data-cat="' + c + '" class="tile_meta_more_info home-arrow hidden-xs brand-color ani"><i class="icon-streamium" aria-hidden="true"></i></a></div></div><div class="streamium-extra-meta">' + a[b].extraMeta + "</div></div></div></div></div>"
        },
        staticTileTemplate: function(a, b, c, d) {
            var e = "";
            a[b].paid && (e = a[b].paid.html);
            var f = "";
            return 1 === d || b % streamium_object.tile_count == 0 ? f = "far-left" : d % streamium_object.tile_count == 0 && (f = "far-right"), '<div class="tile ' + f + '" data-id="' + a[b].id + '" data-nonce="' + a[b].nonce + '" data-cat="' + c + '"><div class="tile_inner-spacer"><div class="tile_inner tile_inner-home lazy" data-src="' + a[b].tileUrl + '">' + e + '<div id="tile-white-selected-' + c + "-" + a[b].id + '" class="tile-white-selected"></div><div class="content"><div class="overlay lazy" data-src="' + a[b].tileUrlExpanded + '"><div class="overlay-gradient"></div><a class="play-icon-wrap hidden-xs" href="' + a[b].link + '"><div class="play-icon-wrap-rel"><div class="play-icon-wrap-rel-ring"></div><span class="play-icon-wrap-rel-play"><i class="fa fa-play fa-1x brand-color" aria-hidden="true"></i></span></div></a><div class="overlay-meta hidden-xs"><span class="top-meta-watched">' + (a[b].progressBar > 0 ? a[b].progressBar + "% watched" : "") + "</span><h4>" + a[b].title + "</h4><p>" + a[b].text + '</p><span class="top-meta-reviews">' + a[b].reviews + '</span><a data-id="' + a[b].post_id + '" data-nonce="' + a[b].nonce + '" data-cat="' + c + '" class="tile_meta_more_info hidden-xs home-arrow brand-color ani"><i class="icon-streamium" aria-hidden="true"></i></a></div></div><div class="streamium-extra-meta">' + a[b].extraMeta + "</div></div></div></div></div>"
        },
        staticTemplate: function(a, c) {
	    console.log('staticTemplate:');console.log(a);
            var d = a.data,
                e = a.count;
            if (this.isMobile.any() && (streamium_object.tile_count = 2), d.length > 0) {
                var f = "",
                    g = 0;
                for (i = 0; i < d.length; i++) {
                    var h = i + 1,
                        j = "tax-" + g;
                    i % streamium_object.tile_count == 0 && (f += '<div class="container-fluid"><div class="row static-row ' + (0 === i ? "static-row-first" : "") + '">'), f += this.staticTileTemplate(d, i, j, h);
                    var k = !1;
                    this.isMobile.any() ? this.isOdd(i) && (k = !0) : h % streamium_object.tile_count == 0 && (k = !0), (k || i === e - 1) && (f += "</div></div>" + this.expandedTemplate(j), g++)
                }
            }
            b("#" + a.id).html(f).promise().done(function() {
                b(".static-row .tile").css("width", 100 / streamium_object.tile_count + "%"), c(!0)
            })
        },
        expandedTemplate: function(a) {
            return '<section class="s3bubble-details-full lazy ' + a + '"><div class="s3bubble-details-full-overlay"></div><div class="container-fluid s3bubble-details-inner-content"><div class="row"><div class="col-sm-5 col-xs-6 rel"><div class="synopis-outer"><div class="synopis-middle"><div class="synopis-inner"><h2 class="synopis"></h2><div class="synopis content"></div></div></div></div><h4 class="series-watched-episode-title"></h4></div><div class="col-sm-7 col-xs-6 rel"><a class="play-icon-wrap synopis" href="#"><div class="play-icon-wrap-rel"><div class="play-icon-wrap-rel-ring"></div><span class="play-icon-wrap-rel-play"><i class="fa fa-play fa-3x brand-color" aria-hidden="true"></i></span></div></a><a href="#" class="synopis-video-trailer streamium-btns hidden-xs">Watch Trailer</a><a href="#" class="s3bubble-details-inner-close"><i class="fa fa-times" aria-hidden="true"></i></a></div></div></div></section><section id="series-watched-' + a + '" class="series-watched"><div id="series-watched-caro-' + a + '" class="series-watched-caro"></div></div></section>'
        },
        getMovieData: function(a, c) {
	    console.log('aaaaaaaaaaaaaaaaaa');console.log(a);
            b(".series-watched-episode-title").empty();
            var d = this;
	    _successFn =  function(c) {
                    if (c.error) return void swal({
                        title: "Error",
                        text: c.message,
                        type: "info",
                        showCancelButton: !0,
                        confirmButtonColor: "#d86c2d",
                        confirmButtonText: "Ok, got it!",
                        closeOnConfirm: !0
                    }, function() {});
		    c.cat = a.cat;
                    var e = d.limitWords(c.content, 30, '<a class="show-more-content" data-id="' + a.post_id + '">' + streamium_object.read_more + "</a>") + c.meta + c.extraReviews;
                    d.isMobile.any() && (e = d.limitWords(c.content, 8, '<a class="show-more-content" data-id="' + a.post_id + '">' + streamium_object.read_more + "</a>"));
                    var f = "." + c.cat,
                        g = "#series-watched-caro-" + c.cat,
                        h = "#series-watched-" + c.cat,
                        i = "#tile-white-selected-" + c.cat + "-" + a.post_id,
                        j = c.title,
                        k = b(f).width(),
                        l = Math.floor(k / 21 * 8);
                b(f).find("h2.synopis").text(c.title), b(f).find("div.synopis").html(e), b(f).find("a.synopis").attr("href", c.href), b(f).css("background-image", "url(" + (c.tileUrlExpanded || c.tileUrl) + ")"), "" === c.trailer ? b(f).find("a.synopis-video-trailer").hide() : b(f).find("a.synopis-video-trailer").fadeIn().attr("href", c.href + "?trailer=true");
                var m = Math.round(b(".cd-main-header").height()),
                    n = Math.round(b(i).outerHeight()) + 4,
                    o = Math.round(b(f).offset().top);
                b("html, body").animate({
                    scrollTop: o - (n + m)
                }, 500), b(f).animate({
                    height: l
                }, 250, function() {
                    b(f + " .s3bubble-details-inner-content").animate({
                        opacity: 1
                    }, 500, function() {}), b(i).show(), b(i).addClass("tile-white-is-selected"), b('[data-toggle="tooltip"]').tooltip()
                });
                var p = b(f).next().find("div.series-watched-caro");
		_successSeriesFn = function(a) {
                    if (a.error) return void console.log("Error: ", a.message);
                    var c = a.data,
                        e = "",
                        i = 0;
                    if (Object.keys(c).length > 0)
                        for (var k = 0; k < Object.keys(c).length; k++) {
                            var l = c[k + 1];
                            if (l.length > 0)
                                for (var m = 0; m < l.length; m++) {
                                    var n = i++;
                                    d.isMobile.any() ? e += '<div class="tile-series"><a class="play-icon-wrap" href="' + l[m].link + "?v=" + n + '"><div class="tile_inner" style="background-image: url(' + l[m].thumbnails + ');"><div class="overlay-gradient"></div><h4><b>S' + l[m].seasons + ":E" + l[m].positions + "</b> " + l[m].titles + "</h4></div></a></div>" : e += '<div class="tile-series"><div class="tile_inner lazy" data-src="' + l[m].thumbnails + '"><div class="overlay-gradient"></div><a class="play-icon-wrap" href="' + l[m].link + "?v=" + n + '"><div class="play-icon-wrap-rel"><div class="play-icon-wrap-rel-ring"></div><span class="play-icon-wrap-rel-play"><i class="fa fa-play fa-1x brand-color" aria-hidden="true"></i></span></div></a><h4><b>S' + l[m].seasons + ":E" + l[m].positions + "</b> " + l[m].titles + "</h4></div></div>"
                                }
                        }
                    b(h).fadeIn(), b(f).find("h4.series-watched-episode-title").text(j + " Episodes"), !1 === b(g).hasClass("slick-initialized") && (p.html(e), b(g).slick(d.slickSeries), b(g).on("setPosition", function(a, c, e) {
                        b(".lazy").Lazy(d.lazy),window._bLazy && window._bLazy.revalidate()
                    }), b(".lazy").Lazy(d.lazy),window._bLazy && window._bLazy.revalidate())
                };
		console.log('aaaaaaaaaaaaaaaaaaaa');console.log(a);
		if(a._data.series) {
		    var _series = a._data.series;
		    var models = vidtop._models;
		    if(/^2PACX/.test(_series)) {
			models.getData(_series, function(_e1){
			    console.log('_e1');console.log(_e1);
			    var _ee = _e1.map(function(_e2){
			    	_e2.link = '#p/' + _e2.gd_key;
				return _e2;
			    })
			    .reduce(function(_obj, _e2){
			    	    _obj[_e2.seasons] =  _obj[_e2.seasons] || [];
			    	    _obj[_e2.seasons].push(_e2);
			    	    return _obj;
			    	},{});
			    console.log(_ee);
			    _successSeriesFn({data: _ee});
			})
		    } else {
			_successSeriesFn({data: (typeof a._data.series === 'string'?JSON.parse(a._data.series): a._data.series)})
		    }
		} else {
                    d.getData({
			action: "streamium_get_dynamic_series_content",
			postId: a.post_id,
                    }, _successSeriesFn)
		}
            };
	    if(a._data) {
		_successFn(a._data);
	    } else {
		b.ajax({
		    //                url: streamium_object.ajax_url,
		    url: [streamium_object.ajax_url, a.action, a.post_id || a.postId].join('/') + '.json',
                    type: "get" || "post",
                    dataType: "json",
                    data: a,
		    crossDomain: true,
                    headers : {
			'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    success: _successFn
		})
	    }
        },
        recentTemplate: function(a, d) {
            var e = this,
                f = a.data,
                g = a.count;
            if (0 === f.length) return void d(!0);
            var h = "";
            for (i = 0; i < f.length; i++) h += this.caroTileTemplate(f, i, "recent");
            if (g < streamium_object.tile_count)
                for (c = 0; c < streamium_object.tile_count - g; c++) h += '<div class="tile filler"><div class="tile_inner-spacer"><div class="tile_inner"></div></div></div>';
            b("#recently-watched").append('<section class="videos"><div class="container-fluid"><div class="row"><div class="col-sm-12"><div class="video-header"><h3>Continue Watching</h3></div></div></div><div class="carousels" id="recently">' + h + "</div></div></section>" + this.expandedTemplate("recent") + '<div class="container-spacer"></div>');
            var j = b("#recently");
            j.slick(this.slick), j.find(".slick-prev").addClass("hidden"), j.on("setPosition", function(a, c, d) {
                b(this).find(".slick-active:first").addClass("far-left"), c.slideCount > 6 && b(this).find(".slick-active:last").addClass("far-right"), b(".lazy").Lazy(e.lazy)
            }), j.on("afterChange", function(a, c, d) {
                b(this).find(".tile").removeClass("far-left").removeClass("far-right"), b(this).find(".slick-active:first").addClass("far-left"), b(this).find(".slick-active:last").addClass("far-right"), 0 === d ? b(this).find(".slick-prev").addClass("hidden") : b(this).find(".slick-prev").removeClass("hidden"), c.currentSlide >= c.slideCount - c.options.slidesToShow ? b(this).find(".slick-next").addClass("hidden") : b(this).find(".slick-next").removeClass("hidden")
            }), d(!0)
        },
        customTemplate: function(d, e) {
            var f = this,
                g = d.data;
            if (0 === g.length) return void e(!0);
            if (g.length > 0)
                for (a = 0; a < g.length; a++) {
                    var h = (g[a].meta.name, g[a].meta.catSlug, g[a].meta.type),
                        j = g[a].meta.link,
                        k = (g[a].meta.home, g[a].meta.taxUrl, g[a].meta.title),
                        l = g[a].meta.count,
                        m = g[a].data,
                        n = "";
                    for (i = 0; i < m.length; i++) n += this.caroTileTemplate(m, i, h);
                    if (l < streamium_object.tile_count)
                        for (c = 0; c < streamium_object.tile_count - l; c++) n += '<div class="tile filler"><div class="tile_inner-spacer"><div class="tile_inner"></div></div></div>';
                    b("#custom-watched").append('<section class="videos"><div class="container-fluid"><div class="row"><div class="col-sm-12"><div class="video-header"><h3>' + k + '</h3><a class="see-all" href="' + j + '">View all</a></div></div></div><div class="carousels" id="custom-slick-' + a + '">' + n + "</div></div></section>" + this.expandedTemplate(h) + '<div class="container-spacer"></div>');
                    var o = b("#custom-slick-" + a);
                    o.slick(this.slick), o.find(".slick-prev").addClass("hidden"), o.on("setPosition", function(a, c, d) {
                        b(this).find(".slick-active:first").addClass("far-left"), c.slideCount > 6 && b(this).find(".slick-active:last").addClass("far-right"), b(".lazy").Lazy(f.lazy)
                    }), o.on("afterChange", function(a, c, d) {
                        b(this).find(".tile").removeClass("far-left").removeClass("far-right"), b(this).find(".slick-active:first").addClass("far-left"), b(this).find(".slick-active:last").addClass("far-right"), 0 === d ? b(this).find(".slick-prev").addClass("hidden") : b(this).find(".slick-prev").removeClass("hidden"), c.currentSlide >= c.slideCount - c.options.slidesToShow ? b(this).find(".slick-next").addClass("hidden") : b(this).find(".slick-next").removeClass("hidden")
                    })
                }
            e(!0)
        },
        homeTemplate: function(d, e) {
            var f = this,
                g = d.data;
            if (0 === g.length) return void e(!0);
            if (g.length > 0)
                for (a = 0; a < g.length; a++) {
                    var h = g[a].meta.title,
                        i = g[a].meta.name,
                        j = g[a].meta.catSlug,
                        k = g[a].meta.link,
                        l = (g[a].meta.home, g[a].meta.count),
                        m = g[a].data;
                    if (m.length > 0) {
                        for (var n = "", o = 0; o < m.length; o++) n += this.caroTileTemplate(m, o, j);
                        if (l < streamium_object.tile_count)
                            for (c = 0; c < streamium_object.tile_count - l; c++) n += '<div class="tile filler"><div class="tile_inner-spacer"><div class="tile_inner"></div></div></div>';
                        b("#home-watched").append('<section class="videos"><div class="container-fluid"><div class="row"><div class="col-sm-12"><div class="video-header"><h3>' + h + ' <i class="fa fa-chevron-right" aria-hidden="true"></i> ' + i + '</h3><a class="see-all" href="' + k + '">View all</a></div></div></div><div class="carousels" id="home-slick-' + a + '">' + n + "</div></div></section>" + this.expandedTemplate(j) + '<div class="container-spacer"></div>');
                        var p = b("#home-slick-" + a);
                        p.slick(this.slick), p.find(".slick-prev").addClass("hidden"), p.on("setPosition", function(a, c, d) {
                            b(this).find(".slick-active:first").addClass("far-left"), c.slideCount > streamium_object.tile_count && b(this).find(".slick-active:last").addClass("far-right"), b(".lazy").Lazy(f.lazy)
                        }), p.on("afterChange", function(a, c, d) {
                            b(this).find(".tile").removeClass("far-left").removeClass("far-right"), b(this).find(".slick-active:first").addClass("far-left"), b(this).find(".slick-active:last").addClass("far-right"), 0 === d ? b(this).find(".slick-prev").addClass("hidden") : b(this).find(".slick-prev").removeClass("hidden"), c.currentSlide >= c.slideCount - c.options.slidesToShow ? b(this).find(".slick-next").addClass("hidden") : b(this).find(".slick-next").removeClass("hidden")
                        })
                    }
                }
            e(!0)
        }
    }
}
if (function(a, b) {
        var c, d = a.jQuery || a.Cowboy || (a.Cowboy = {});
        d.throttle = c = function(a, c, e, f) {
            function g() {
                function d() {
                    i = +new Date, e.apply(j, l)
                }

                function g() {
                    h = b
                }
                var j = this,
                    k = +new Date - i,
                    l = arguments;
                f && !h && d(), h && clearTimeout(h), f === b && k > a ? d() : !0 !== c && (h = setTimeout(f ? g : d, f === b ? a - k : a))
            }
            var h, i = 0;
            return "boolean" != typeof c && (f = e, e = c, c = b), d.guid && (g.guid = e.guid = e.guid || d.guid++), g
        }, d.debounce = function(a, d, e) {
            return e === b ? c(a, d, !1) : c(a, e, !1 !== d)
        }
    }(this), _page_ready(function(a) {
        function b() {
            g = Math.round(a(window).innerWidth() / 21 * 9), a(".streamium-slider .slick-slide").height(g)
        }
        var c = Streamium();
        c.init();
        var d = streamium_object.tile_count,
            e = Math.round(a(".container-fluid").width() / d),
            f = e / 2,
            g = Math.round(a(window).innerWidth() / 21 * 9);
        a(".streamium-slider .slick-slide").height(g),
	a(".streamium-slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: !1,
            autoplay: parseInt(streamium_object.autoplay_slider),
            autoplaySpeed: 5e3,
            pauseOnHover: !0,
            adaptiveHeight: !0,
            speed: 500,
            fade: !0,
            cssEase: "linear"
        }),
	a(".streamium-slider .slick-slide").height(g),
	b(),
	window.onresize = b,
	a("head").append('<style type="text/css">.shiftLeftFirst { transform: translate3d(' + 2 * f + "px, 0, 0);}.shiftRightFirst { transform: translate3d(-" + 2 * f + "px, 0, 0);}.shiftLeft { transform: translate3d(-" + f + "px, 0, 0);}.shiftRight { transform: translate3d(" + f + "px, 0, 0);}</style>"),
	a('[data-toggle="tooltip"]').tooltip();
        var h = "home-arrow";
        c.isMobile.any() && (h = "tile"),
	a("body").on("click", "." + h, function(b) {
            b.preventDefault();

            var d = a(this).data("cat"),
                e = a(this).data("id"),
                f = a(this).data("nonce");
            a(".series-watched").fadeOut(),
	    a(".tile-white-selected").hide(),
	    a(".tile-white-selected").removeClass("tile-white-is-selected");
	    var _post;
	    console.log(streamium_object._data.category);
	    var _obj = {
                action: "streamium_get_dynamic_content",
                cat: d,
                post_id: e,
		//                nonce: f
            };
	    if(streamium_object._data.category) {
		_.filter(streamium_object._data.category, function(_e){
		    console.log("_e:");console.log(_e);
		    var _post;
		    if(_e.data) {
			_post = _.filter(_e.data, function(_e1){
			return _e1.post_id == e;
			})[0];
		    } else if(_e.post_id == e) {
			    _post = _e;
		    }
		    console.log(_post);
		    if(_post)
		    {
			_obj._data = _post;
// 			_obj._data.post = {ID: e};
// 			_obj._data.href = '#p/' + e;
// //			_obj._data.reviews = _obj._data.moreReviews;
// 			_obj._data.content = _obj._data.text;
			console.log(_obj.data);
			c.getMovieData(_obj, function() {});
			return 1;
		    }
		    return !1;
		})
	    } else {
		c.getMovieData(_obj, function() {});
		return !1
	    }
        }),
	a("body").on("click", ".s3bubble-details-inner-close", function(b) {
	    console.log('2');
            b.preventDefault();
            var c = a(this).parent().parent().parent();
            a(".series-watched").fadeOut(),
	    a(".tile-white-selected").hide(), c.animate({
                opacity: 0
            }, 250, function() {
                c.parent().animate({
                    height: 0
                }, 250, function() {})
            })
        }),
	_more_content_render = function(b){
	    		a(".streamium-review-panel-content").html(b.content), a(".streamium-review-panel-header h1").html(b.title), a(".streamium-review-panel").addClass("is-visible"), a("html, body").addClass("overflow-hidden")
	},
	a("body").on("click", ".show-more-content", function(b) {
            b.preventDefault();
            var d = a(this).data("id");
            var dtype = a(this).data("type");
	    if(!dtype) dtype = 'category';
	    var _featured;
	    if(dtype == 'featured') {
		_featured = streamium_object._data[dtype].filter(function(_e){
		    return _e.post_id == d;
		})[0];
	    } else {
		console.log(streamium_object._data[dtype]);
		streamium_object._data[dtype].filter(function(_e1){
		    return _e1.data.filter(function(_e){
			if(_e.post_id == d) {
			    _featured = _e;
			    return true;
			} else
			    return false
		    })
		})
	    }
	    console.log('_featured:');
	    console.log(_featured);
	    console.log("id:" + d);
	    if(_featured) {
		_more_content_render(_featured);
		// var b1 = _.filter(_featured, function(_e){
		//     return _e.id == d;
		// });
		// console.log('b1');
		// console.log(b1[0]);
		// _more_content_render(b1[0]);
	    } else {
            c.getData({
                action: "streamium_get_more_content",
                postId: d,
//                nonce: streamium_object.extra_api_nonce
            }, function(b) {
                b.error && console.log("ERROR:", b.message),
		_more_content_render(b)
		// a(".streamium-review-panel-content").html(b.content), a(".streamium-review-panel-header h1").html(b.title), a(".streamium-review-panel").addClass("is-visible"), a("html, body").addClass("overflow-hidden")
            })
	    }
        }),
	c.isMobile.any() ||
	    a("body").on("mouseenter", ".tile_inner-home", function() {
//	    console.log('1');
            // if (1 === a(this).find(".tile-white-is-selected").length)
	    // 	return void a(this).find(".content").hide();
//		console.log('1.1');
            if (a(this).find(".content").show(),
		!a(this).parent().hasClass("filler")) {
//		console.log('1.2');
                a(this).addClass("remove-background"),
		a(this).find(".streamium-extra-meta").hide();
                var b = a(this).parent().parent();
                b.hasClass("far-left") ? b.nextAll().addClass("shiftLeftFirst") : b.hasClass("far-right") ? b.prevAll().addClass("shiftRightFirst") : (b.nextAll().addClass("shiftRight"), b.prevAll().addClass("shiftLeft")), a(this).css("transform", "scale(2)")
            }
        }).on("mouseleave", ".tile_inner-home", function() {
            a(this).removeClass("remove-background"), a(this).find(".streamium-extra-meta").fadeIn();
            var b = a(this).parent().parent();
            b.hasClass("far-left") ? b.nextAll().removeClass("shiftLeftFirst") : b.hasClass("far-right") ? b.prevAll().removeClass("shiftRightFirst") : (b.nextAll().removeClass("shiftRight"), b.prevAll().removeClass("shiftLeft")), a(this).css("transform", "scale(1)")
        }), _home_archive_render = function(
			//b, d,
			     e) {
            //if (b[0].error || d[0].error || e[0].error) return void console.log("ERROR: ", b[0].message + "," + d[0].message + "," + e[0].message);
//            c.recentTemplate(b[0], function() {
			//              c.customTemplate(d[0], function() {
			console.log(e);
                    c.homeTemplate(e, function() {
                        var b = Math.round(a(".carousels").height() / 2);
                        c.isMobile.any() || (b += 30),
			a(".container-spacer").animate({height: b + "px"}, 50, function() {
                            a(".streamium-loading").fadeOut(), a(".lazy").Lazy(c.lazy)
                        })
                    })
    //            })
//            })
	},(
	    (streamium_object.is_home || streamium_object.is_archive) && !streamium_object.is_tax)
	    && (streamium_object._data.category ? (
		_home_archive_render({data: streamium_object._data.category})
	    ): (
		a.when(
		    // 	a.ajax({
		    // 		    type: "get" || "post",
		    // 		    dataType: "json",
		    // 		    url: [streamium_object.ajax_url, "recently_watched_api_post"].join('/') + '.json',
		    // 		    crossDomain: true,
		    // 		    headers : {
		    // 			'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
		    // 		    },
		    // 		    data: {
		    // 			action: "recently_watched_api_post",
		    // 			//                nonce: streamium_object.recently_watched_api_nonce
		    // 		    }
		    // 		}),
		    // 		a.ajax({
		    // 		    type: "get" || "post",
		    //             dataType: "json",
		    // 	    crossDomain: true,
		    //             headers : {
		    //                 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
		    //             },
		    // 	    url: [streamium_object.ajax_url,  "custom_api_post" ].join('/') + '.json',
		    //             //url: streamium_object.ajax_url,
		    //             data: {
		    //                 action: "custom_api_post",
		    // //                nonce: streamium_object.custom_api_nonce
		    //             }
		    // 		}),
		    a.ajax({
			type: "get" || "post",
			dataType: "json",
			crossDomain: true,
			headers : {
			    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			//url: streamium_object.ajax_url,
			url: [streamium_object.ajax_url, "home_api_post",  streamium_object.query && streamium_object.query['name']? streamium_object.query['name']: null].filter(function(e){return e}).join('/') + '.json',
			data: {
			    action: "home_api_post",
			    query: streamium_object.query,
			    //                nonce: streamium_object.home_api_nonce
			}
		    })).done(
			_home_archive_render
		    )
	    )),
	_tax_render = function(b){
	    b.id = "tax-watched",
	    c.staticTemplate(b, function() {
                var b = Math.round(a(".tile").height() / 2);
                a(".static-row").css("margin-top", b + "px"), a(".lazy").Lazy(c.lazy), a(".streamium-loading").fadeOut()
            })
	},

	streamium_object.is_tax && (
	    _tax_data = streamium_object._data.category[0].data,
	    ( _tax_data ? (
		_tax_render({count: _tax_data.length, data: _tax_data})
	    ): (c.getData({
		action: "tax_api_post",
		search: "all",
		//            nonce: streamium_object.tax_api_nonce
            }, function(b) {
		if (b.error) return void console.log("Error: ", b.message);
		_tax_render(b);
		// b.id = "tax-watched", c.staticTemplate(b, function() {
		//     var b = Math.round(a(".tile").height() / 2);
		//     a(".static-row").css("margin-top", b + "px"), a(".lazy").Lazy(c.lazy), a(".streamium-loading").fadeOut()
		//})
            })))),
	a(".tax-search-filter").on("click", function(b) {
            b.preventDefault();
            var d = a(this).data("type");
            streamium_object.search = d, c.getData({
                action: "tax_api_post",
                search: "all",
//                nonce: streamium_object.tax_api_nonce
            }, function(b) {
                if (b.error) return void console.log("Error: ", b.message);
                b.id = "tax-watched", c.staticTemplate(b, function() {
                    var b = Math.round(a(".tile").height() / 2);
                    a(".static-row").css("margin-top", b + "px"), a(".lazy").Lazy(c.lazy), a(".streamium-loading").fadeOut()
                })
            })
        }), streamium_object.is_search && (c.getData({
            action: "search_api_post",
            search: "all",
//            nonce: streamium_object.search_api_nonce
        }, function(b) {
            if (b.error) return console.log("Error: ", b.message), void a("#search-watched").html('<div class="container-fluid"><div class="row"><div class="col-sm-12"><p>Error: ' + b.message + "...</p></div></div></div>");
            b.id = "search-watched", c.staticTemplate(b, function() {
                var b = Math.round(a(".tile").height() / 2);
                a(".static-row").css("margin-top", b + "px"), a(".lazy").Lazy(c.lazy), a(".streamium-loading").fadeOut()
            })
        }), a(".search-search-filter").on("click", function(b) {
            b.preventDefault();
            var d = a(this).data("type");
            streamium_object.search = {
                s: "all",
                date: d
            }, c.getData({
                action: "search_api_post",
//                nonce: streamium_object.search_api_nonce
            }, function(b) {
                if (b.error) return console.log("Error: ", b.message), void a("#search-watched").html('<div class="container-fluid"><div class="row"><div class="col-sm-12"><p>Error: ' + b.message + "...</p></div></div></div>");
                b.id = "search-watched", c.staticTemplate(b, function() {
                    var b = Math.round(a(".tile").height() / 2);
                    a(".static-row").css("margin-top", b + "px"), a(".lazy").Lazy(c.lazy), a(".streamium-loading").fadeOut()
                })
            })
        }))
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
	"use strict";

    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 2) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")
}(jQuery),
function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.6", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.6", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b);
        if (("prev" == a && 0 === c || "next" == a && c == this.$items.length - 1) && !this.options.wrap) return b;
        var d = "prev" == a ? -1 : 1,
            e = (c + d) % this.$items.length;
        return this.$items.eq(e)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(a > this.$items.length - 1 || a < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    }, c.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.6", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse")) && b.transitioning)) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                if (!a.support.transition) return e.call(this);
                this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = b(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
        }))
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.6", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e),
                g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
            }
            return !1
        }
    }, g.prototype.keydown = function(c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d),
                    g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = e.find(".dropdown-menu li:not(.disabled):visible a");
                if (h.length) {
                    var i = h.index(c.target);
                    38 == c.which && i > 0 && i--, 40 == c.which && i < h.length - 1 && i++, ~i || (i = 0), h.eq(i).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery),
function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    if (this.ignoreBackdropClick) return void(this.ignoreBackdropClick = !1);
                    a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide())
                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.isInStateTrue = function() {
        for (var a in this.inState)
            if (this.inState[a]) return !0;
        return !1
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) {
            if (clearTimeout(c.timeout), c.hoverState = "out", !c.options.delay || !c.options.delay.hide) return c.hide();
            c.timeout = setTimeout(function() {
                "out" == c.hoverState && c.hide()
            }, c.options.delay.hide)
        }
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
                top: 0,
                left: 0
            } : b.offset(),
            g = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            h = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, g, h, f)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-original-title") || ("function" == typeof b.title ? b.title.call(a[0]) : b.title)
    }, c.prototype.getUID = function(a) {
        do {
            a += ~~(1e6 * Math.random())
        } while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && ((c = a(b.currentTarget).data("bs." + this.type)) || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.6", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery),
function(a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.6", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.6", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return e < c && "top";
        if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom"
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery),
// window.FontAwesomeCdnConfig = {
//         autoA11y: {
//             enabled: !1
//         },
//         asyncLoading: {
//             enabled: !1
//         },
//         reporting: {
//             enabled: !0,
//             domains: "localhost, *.dev"
//         },
//         useUrl: "use.fontawesome.com",
//         faCdnUrl: "https://cdn.fontawesome.com:443",
//         code: "90156040ed"
//     },
//     function() {
//         function a(a) {
//             var b, c, d, e;
//             a = a || "fa", b = document.querySelectorAll("." + a), Array.prototype.forEach.call(b, function(a) {
//                 c = a.getAttribute("title"), a.setAttribute("aria-hidden", "true"), d = !a.nextElementSibling || !a.nextElementSibling.classList.contains("sr-only"), c && d && (e = document.createElement("span"), e.innerHTML = c, e.classList.add("sr-only"), a.parentNode.insertBefore(e, a.nextSibling))
//             })
//         }! function() {
//             "use strict";

//             function a(a) {
//                 l.push(a), 1 == l.length && k()
//             }

//             function b() {
//                 for (; l.length;) l[0](), l.shift()
//             }

//             function c(a) {
//                 this.a = m, this.b = void 0, this.f = [];
//                 var b = this;
//                 try {
//                     a(function(a) {
//                         f(b, a)
//                     }, function(a) {
//                         g(b, a)
//                     })
//                 } catch (a) {
//                     g(b, a)
//                 }
//             }

//             function d(a) {
//                 return new c(function(b, c) {
//                     c(a)
//                 })
//             }

//             function e(a) {
//                 return new c(function(b) {
//                     b(a)
//                 })
//             }

//             function f(a, b) {
//                 if (a.a == m) {
//                     if (b == a) throw new TypeError;
//                     var c = !1;
//                     try {
//                         var d = b && b.then;
//                         if (null != b && "object" == typeof b && "function" == typeof d) return void d.call(b, function(b) {
//                             c || f(a, b), c = !0
//                         }, function(b) {
//                             c || g(a, b), c = !0
//                         })
//                     } catch (b) {
//                         return void(c || g(a, b))
//                     }
//                     a.a = 0, a.b = b, h(a)
//                 }
//             }

//             function g(a, b) {
//                 if (a.a == m) {
//                     if (b == a) throw new TypeError;
//                     a.a = 1, a.b = b, h(a)
//                 }
//             }

//             function h(b) {
//                 a(function() {
//                     if (b.a != m)
//                         for (; b.f.length;) {
//                             var a = b.f.shift(),
//                                 c = a[0],
//                                 d = a[1],
//                                 e = a[2],
//                                 a = a[3];
//                             try {
//                                 0 == b.a ? e("function" == typeof c ? c.call(void 0, b.b) : b.b) : 1 == b.a && ("function" == typeof d ? e(d.call(void 0, b.b)) : a(b.b))
//                             } catch (b) {
//                                 a(b)
//                             }
//                         }
//                 })
//             }

//             function i(a) {
//                 return new c(function(b, c) {
//                     var d = 0,
//                         f = [];
//                     0 == a.length && b(f);
//                     for (var g = 0; g < a.length; g += 1) e(a[g]).c(function(c) {
//                         return function(e) {
//                             f[c] = e, (d += 1) == a.length && b(f)
//                         }
//                     }(g), c)
//                 })
//             }

//             function j(a) {
//                 return new c(function(b, c) {
//                     for (var d = 0; d < a.length; d += 1) e(a[d]).c(b, c)
//                 })
//             }
//             var k, l = [];
//             k = function() {
//                 setTimeout(b)
//             };
//             var m = 2;
//             c.prototype.g = function(a) {
//                 return this.c(void 0, a)
//             }, c.prototype.c = function(a, b) {
//                 var d = this;
//                 return new c(function(c, e) {
//                     d.f.push([a, b, c, e]), h(d)
//                 })
//             }, window.Promise || (window.Promise = c, window.Promise.resolve = e, window.Promise.reject = d, window.Promise.race = j, window.Promise.all = i, window.Promise.prototype.then = c.prototype.c, window.Promise.prototype.catch = c.prototype.g)
//         }(),
//         function() {
//             function a(a) {
//                 this.el = a;
//                 for (var b = a.className.replace(/^\s+|\s+$/g, "").split(/\s+/), d = 0; d < b.length; d++) c.call(this, b[d])
//             }
//             if (!(void 0 === window.Element || "classList" in document.documentElement)) {
//                 var b = Array.prototype,
//                     c = b.push,
//                     d = b.splice,
//                     e = b.join;
//                 a.prototype = {
//                         add: function(a) {
//                             this.contains(a) || (c.call(this, a), this.el.className = this.toString())
//                         },
//                         contains: function(a) {
//                             return -1 != this.el.className.indexOf(a)
//                         },
//                         item: function(a) {
//                             return this[a] || null
//                         },
//                         remove: function(a) {
//                             if (this.contains(a)) {
//                                 for (var b = 0; b < this.length && this[b] != a; b++);
//                                 d.call(this, b, 1), this.el.className = this.toString()
//                             }
//                         },
//                         toString: function() {
//                             return e.call(this, " ")
//                         },
//                         toggle: function(a) {
//                             return this.contains(a) ? this.remove(a) : this.add(a), this.contains(a)
//                         }
//                     }, window.DOMTokenList = a,
//                     function(a, b, c) {
//                         Object.defineProperty ? Object.defineProperty(a, b, {
//                             get: c
//                         }) : a.__defineGetter__(b, c)
//                     }(Element.prototype, "classList", function() {
//                         return new a(this)
//                     })
//             }
//         }();
//         var b = function(a, b, c) {
//                 function d(a) {
//                     return g.body ? a() : void setTimeout(function() {
//                         d(a)
//                     })
//                 }

//                 function e() {
//                     h.addEventListener && h.removeEventListener("load", e), h.media = c || "all"
//                 }
//                 var f, g = window.document,
//                     h = g.createElement("link");
//                 if (b) f = b;
//                 else {
//                     var i = (g.body || g.getElementsByTagName("head")[0]).childNodes;
//                     f = i[i.length - 1]
//                 }
//                 var j = g.styleSheets;
//                 h.rel = "stylesheet", h.href = a, h.media = "only x", d(function() {
//                     f.parentNode.insertBefore(h, b ? f : f.nextSibling)
//                 });
//                 var k = function(a) {
//                     for (var b = h.href, c = j.length; c--;)
//                         if (j[c].href === b) return a();
//                     setTimeout(function() {
//                         k(a)
//                     })
//                 };
//                 return h.addEventListener && h.addEventListener("load", e), h.onloadcssdefined = k, k(e), h
//             },
//             c = null;
//         ! function() {
//             function a(a, b) {
//                 document.addEventListener ? a.addEventListener("scroll", b, !1) : a.attachEvent("scroll", b)
//             }

//             function b(a) {
//                 document.body ? a() : document.addEventListener ? document.addEventListener("DOMContentLoaded", function b() {
//                     document.removeEventListener("DOMContentLoaded", b), a()
//                 }) : document.attachEvent("onreadystatechange", function b() {
//                     "interactive" != document.readyState && "complete" != document.readyState || (document.detachEvent("onreadystatechange", b), a())
//                 })
//             }

//             function d(a) {
//                 this.a = document.createElement("div"), this.a.setAttribute("aria-hidden", "true"), this.a.appendChild(document.createTextNode(a)), this.b = document.createElement("span"), this.c = document.createElement("span"), this.h = document.createElement("span"), this.f = document.createElement("span"), this.g = -1, this.b.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.c.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.f.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.h.style.cssText = "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;", this.b.appendChild(this.h), this.c.appendChild(this.f), this.a.appendChild(this.b), this.a.appendChild(this.c)
//             }

//             function e(a, b) {
//                 a.a.style.cssText = "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:" + b + ";"
//             }

//             function f(a) {
//                 var b = a.a.offsetWidth,
//                     c = b + 100;
//                 return a.f.style.width = c + "px", a.c.scrollLeft = c, a.b.scrollLeft = a.b.scrollWidth + 100, a.g !== b && (a.g = b, !0)
//             }

//             function g(b, c) {
//                 function d() {
//                     var a = e;
//                     f(a) && a.a.parentNode && c(a.g)
//                 }
//                 var e = b;
//                 a(b.b, d), a(b.c, d), f(b)
//             }

//             function h(a, b) {
//                 var c = b || {};
//                 this.family = a, this.style = c.style || "normal", this.weight = c.weight || "normal", this.stretch = c.stretch || "normal"
//             }

//             function i() {
//                 if (null === l) {
//                     var a = document.createElement("div");
//                     try {
//                         a.style.font = "condensed 100px sans-serif"
//                     } catch (a) {}
//                     l = "" !== a.style.font
//                 }
//                 return l
//             }

//             function j(a, b) {
//                 return [a.style, a.weight, i() ? a.stretch : "", "100px", b].join(" ")
//             }
//             var k = null,
//                 l = null,
//                 m = null;
//             h.prototype.load = function(a, c) {
//                 var f = this,
//                     h = a || "BESbswy",
//                     i = c || 3e3,
//                     l = (new Date).getTime();
//                 return new Promise(function(a, c) {
//                     if (null === m && (m = !!window.FontFace), m) {
//                         var n = new Promise(function(a, b) {
//                                 function c() {
//                                     (new Date).getTime() - l >= i ? b() : document.fonts.load(j(f, f.family), h).then(function(b) {
//                                         1 <= b.length ? a() : setTimeout(c, 25)
//                                     }, function() {
//                                         b()
//                                     })
//                                 }
//                                 c()
//                             }),
//                             o = new Promise(function(a, b) {
//                                 setTimeout(b, i)
//                             });
//                         Promise.race([o, n]).then(function() {
//                             a(f)
//                         }, function() {
//                             c(f)
//                         })
//                     } else b(function() {
//                         function b() {
//                             var b;
//                             (b = -1 != q && -1 != r || -1 != q && -1 != s || -1 != r && -1 != s) && ((b = q != r && q != s && r != s) || (null === k && (b = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent), k = !!b && (536 > parseInt(b[1], 10) || 536 === parseInt(b[1], 10) && 11 >= parseInt(b[2], 10))), b = k && (q == t && r == t && s == t || q == u && r == u && s == u || q == v && r == v && s == v)), b = !b), b && (w.parentNode && w.parentNode.removeChild(w), clearTimeout(x), a(f))
//                         }

//                         function m() {
//                             if ((new Date).getTime() - l >= i) w.parentNode && w.parentNode.removeChild(w), c(f);
//                             else {
//                                 var a = document.hidden;
//                                 !0 !== a && void 0 !== a || (q = n.a.offsetWidth, r = o.a.offsetWidth, s = p.a.offsetWidth, b()), x = setTimeout(m, 50)
//                             }
//                         }
//                         var n = new d(h),
//                             o = new d(h),
//                             p = new d(h),
//                             q = -1,
//                             r = -1,
//                             s = -1,
//                             t = -1,
//                             u = -1,
//                             v = -1,
//                             w = document.createElement("div"),
//                             x = 0;
//                         w.dir = "ltr", e(n, j(f, "sans-serif")), e(o, j(f, "serif")), e(p, j(f, "monospace")), w.appendChild(n.a), w.appendChild(o.a), w.appendChild(p.a), document.body.appendChild(w), t = n.a.offsetWidth, u = o.a.offsetWidth, v = p.a.offsetWidth, m(), g(n, function(a) {
//                             q = a, b()
//                         }), e(n, j(f, '"' + f.family + '",sans-serif')), g(o, function(a) {
//                             r = a, b()
//                         }), e(o, j(f, '"' + f.family + '",serif')), g(p, function(a) {
//                             s = a, b()
//                         }), e(p, j(f, '"' + f.family + '",monospace'))
//                     })
//                 })
//             }, c = h
//         }();
//         var d = {
//                 observe: function(a, b) {
//                     for (var d = b.prefix, e = 0; e < a.length; e++) ! function(a) {
//                         var b = a.weight ? "-" + a.weight : "",
//                             e = a.style ? "-" + a.style : "",
//                             f = a.className ? "-" + a.className : "",
//                             g = a.className ? "-" + a.className + b + e : "",
//                             h = document.getElementsByTagName("html")[0].classList,
//                             i = function(a) {
//                                 h.add(d + f + "-" + a), h.add(d + g + "-" + a)
//                             },
//                             j = function(a) {
//                                 h.remove(d + f + "-" + a), h.remove(d + g + "-" + a)
//                             };
//                         i("loading"), new c(a.familyName).load(a.testString).then(function() {
//                             i("ready"), j("loading")
//                         }, function() {
//                             i("failed"), j("loading")
//                         })
//                     }(a[e])
//                 }
//             },
//             e = {
//                 load: function(a) {
//                     var b = document.createElement("link");
//                     b.href = a, b.media = "all", b.rel = "stylesheet", document.getElementsByTagName("head")[0].appendChild(b)
//                 },
//                 loadAsync: function(a) {
//                     b(a)
//                 }
//             },
//             f = {
//                 load: function(a) {
//                     var b = document.createElement("script"),
//                         c = document.scripts[0];
//                     b.src = a, c.parentNode.appendChild(b)
//                 }
//             };
//         try {
//             if (window.FontAwesomeCdnConfig) {
//                 var g = window.FontAwesomeCdnConfig,
//                     h = g.useUrl,
//                     i = g.faCdnUrl,
//                     j = g.code,
//                     k = "FontAwesome",
//                     l = a.bind(a, "fa"),
//                     m = function() {};
//                 g.autoA11y.enabled && (function(a) {
//                     var b, c = [],
//                         d = document,
//                         e = d.documentElement.doScroll,
//                         f = "DOMContentLoaded",
//                         g = (e ? /^loaded|^c/ : /^loaded|^i|^c/).test(d.readyState);
//                     g || d.addEventListener(f, b = function() {
//                         for (d.removeEventListener(f, b), g = 1; b = c.shift();) b()
//                     }), g ? setTimeout(a, 0) : c.push(a)
//                 }(l), function(a) {
//                     "undefined" != typeof MutationObserver && new MutationObserver(a).observe(document, {
//                         childList: !0,
//                         subtree: !0
//                     })
//                 }(l)), g.reporting.enabled && function(a, b) {
//                     var c = !1;
//                     return a.split(",").forEach(function(a) {
//                         var d = new RegExp(a.trim().replace(".", "\\.").replace("*", "(.*)"));
//                         b.match(d) && (c = !0)
//                     }), c
//                 }(g.reporting.domains, location.host) && f.load(i + "/js/stats.js"), cssUrl = "https://" + h + "/" + j + ".css", new c(k).load("").then(function() {
//                     ((window.FontAwesomeHooks || {}).loaded || m)()
//                 }, m), g.asyncLoading.enabled ? e.loadAsync(cssUrl) : e.load(cssUrl), d.observe([{
//                     familyName: k,
//                     testString: ""
//                 }], {
//                     prefix: "fa-events-icons"
//                 })
//             }
//         } catch (a) {}
//     }(),
    function(a, b) {
        "use strict";

        function c(c, d, f, h, i) {
            function j() {
                y = a.devicePixelRatio > 1, k(f), d.delay >= 0 && setTimeout(function() {
                    l(!0)
                }, d.delay), (d.delay < 0 || d.combined) && (h.e = s(d.throttle, function(a) {
                    "resize" === a.type && (w = x = -1), l(a.all)
                }), h.a = function(a) {
                    k(a), f.push.apply(f, a)
                }, h.g = function() {
                    return f = e(f).filter(function() {
                        return !e(this).data(d.loadedName)
                    })
                }, h.f = function(a) {
                    for (var b = 0; b < a.length; b++) {
                        var c = f.filter(function() {
                            return this === a[b]
                        });
                        c.length && l(!1, c)
                    }
                }, l(), e(d.appendScroll).on("scroll." + i + " resize." + i, h.e))
            }

            function k(a) {
                var f = d.defaultImage,
                    g = d.placeholder,
                    h = d.imageBase,
                    i = d.srcsetAttribute,
                    j = d.loaderAttribute,
                    k = d._f || {};
                a = e(a).filter(function() {
                    var a = e(this),
                        c = q(this);
                    return !a.data(d.handledName) && (a.attr(d.attribute) || a.attr(i) || a.attr(j) || k[c] !== b)
                }).data("plugin_" + d.name, c);
                for (var l = 0, m = a.length; l < m; l++) {
                    var n = e(a[l]),
                        o = q(a[l]),
                        p = n.attr(d.imageBaseAttribute) || h;
                    o === C && p && n.attr(i) && n.attr(i, r(n.attr(i), p)), k[o] === b || n.attr(j) || n.attr(j, k[o]), o === C && f && !n.attr(D) ? n.attr(D, f) : o === C || !g || n.css(G) && "none" !== n.css(G) || n.css(G, "url('" + g + "')")
                }
            }

            function l(a, b) {
                if (!f.length) return void(d.autoDestroy && c.destroy());
                for (var g = b || f, h = !1, i = d.imageBase || "", j = d.srcsetAttribute, k = d.handledName, l = 0; l < g.length; l++)
                    if (a || b || n(g[l])) {
                        var o = e(g[l]),
                            p = q(g[l]),
                            r = o.attr(d.attribute),
                            s = o.attr(d.imageBaseAttribute) || i,
                            t = o.attr(d.loaderAttribute);
                        o.data(k) || d.visibleOnly && !o.is(":visible") || !((r || o.attr(j)) && (p === C && (s + r !== o.attr(D) || o.attr(j) !== o.attr(E)) || p !== C && s + r !== o.css(G)) || t) || (h = !0, o.data(k, !0), m(o, p, s, t))
                    }
                h && (f = e(f).filter(function() {
                    return !e(this).data(k)
                }))
            }

            function m(a, b, c, f) {
                ++v;
                var g = function() {
                    u("onError", a), t(), g = e.noop
                };
                u("beforeLoad", a);
                var h = d.attribute,
                    i = d.srcsetAttribute,
                    j = d.sizesAttribute,
                    k = d.retinaAttribute,
                    l = d.removeAttribute,
                    m = d.loadedName,
                    n = a.attr(k);
                if (f) {
                    var o = function() {
                        l && a.removeAttr(d.loaderAttribute), a.data(m, !0), u(z, a), setTimeout(t, 1), o = e.noop
                    };
                    a.off(B).one(B, g).one(A, o), u(f, a, function(b) {
                        b ? (a.off(A), o()) : (a.off(B), g())
                    }) || a.trigger(B)
                } else {
                    var p = e(new Image);
                    p.one(B, g).one(A, function() {
                        a.hide(), b === C ? a.attr(F, p.attr(F)).attr(E, p.attr(E)).attr(D, p.attr(D)) : a.css(G, "url('" + p.attr(D) + "')"), a[d.effect](d.effectTime), l && (a.removeAttr(h + " " + i + " " + k + " " + d.imageBaseAttribute), j !== F && a.removeAttr(j)), a.data(m, !0), u(z, a), p.remove(), t()
                    });
                    var q = (y && n ? n : a.attr(h)) || "";
                    p.attr(F, a.attr(j)).attr(E, a.attr(i)).attr(D, q ? c + q : null), p.complete && p.trigger(A)
                }
            }

            function n(a) {
                var b = a.getBoundingClientRect(),
                    c = d.scrollDirection,
                    e = d.threshold,
                    f = p() + e > b.top && -e < b.bottom,
                    g = o() + e > b.left && -e < b.right;
                return "vertical" === c ? f : "horizontal" === c ? g : f && g
            }

            function o() {
                return w >= 0 ? w : w = e(a).width()
            }

            function p() {
                return x >= 0 ? x : x = e(a).height()
            }

            function q(a) {
                return a.tagName.toLowerCase()
            }

            function r(a, b) {
                if (b) {
                    var c = a.split(",");
                    a = "";
                    for (var d = 0, e = c.length; d < e; d++) a += b + c[d].trim() + (d !== e - 1 ? "," : "")
                }
                return a
            }

            function s(a, b) {
                var e, f = 0;
                return function(g, h) {
                    function i() {
                        f = +new Date, b.call(c, g)
                    }
                    var j = +new Date - f;
                    e && clearTimeout(e), j > a || !d.enableThrottle || h ? i() : e = setTimeout(i, a - j)
                }
            }

            function t() {
                --v, f.length || v || u("onFinishedAll")
            }

            function u(a, b, e) {
                return !!(a = d[a]) && (a.apply(c, [].slice.call(arguments, 1)), !0)
            }
            var v = 0,
                w = -1,
                x = -1,
                y = !1,
                z = "afterLoad",
                A = "load",
                B = "error",
                C = "img",
                D = "src",
                E = "srcset",
                F = "sizes",
                G = "background-image";
            "event" === d.bind || g ? j() : e(a).on(A + "." + i, j)
        }

        function d(d, g) {
            var h = this,
                i = e.extend({}, h.config, g),
                j = {},
                k = i.name + "-" + ++f;
            return h.config = function(a, c) {
                return c === b ? i[a] : (i[a] = c, h)
            }, h.addItems = function(a) {
                return j.a && j.a("string" === e.type(a) ? e(a) : a), h
            }, h.getItems = function() {
                return j.g ? j.g() : {}
            }, h.update = function(a) {
                return j.e && j.e({}, !a), h
            }, h.force = function(a) {
                return j.f && j.f("string" === e.type(a) ? e(a) : a), h
            }, h.loadAll = function() {
                return j.e && j.e({
                    all: !0
                }, !0), h
            }, h.destroy = function() {
                return e(i.appendScroll).off("." + k, j.e), e(a).off("." + k), j = {}, b
            }, c(h, i, d, j, k), i.chainable ? d : h
        }
        var e = a.jQuery || a.Zepto,
            f = 0,
            g = !1;
        e.fn.Lazy = e.fn.lazy = function(a) {
	    return;
            return new d(this, a)
        }, e.Lazy = e.lazy = function(a, c, f) {
            if (e.isFunction(c) && (f = c, c = []), e.isFunction(f)) {
                a = e.isArray(a) ? a : [a], c = e.isArray(c) ? c : [c];
                for (var g = d.prototype.config, h = g._f || (g._f = {}), i = 0, j = a.length; i < j; i++)(g[a[i]] === b || e.isFunction(g[a[i]])) && (g[a[i]] = f);
                for (var k = 0, l = c.length; k < l; k++) h[c[k]] = a[0]
            }
        }, d.prototype.config = {
            name: "lazy",
            chainable: !0,
            autoDestroy: !0,
            bind: "load",
            threshold: 500,
            visibleOnly: !1,
            appendScroll: a,
            scrollDirection: "both",
            imageBase: null,
            defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            placeholder: null,
            delay: -1,
            combined: !1,
            attribute: "data-src",
            srcsetAttribute: "data-srcset",
            sizesAttribute: "data-sizes",
            retinaAttribute: "data-retina",
            loaderAttribute: "data-loader",
            imageBaseAttribute: "data-imagebase",
            removeAttribute: !0,
            handledName: "handled",
            loadedName: "loaded",
            effect: "show",
            effectTime: 0,
            enableThrottle: !0,
            throttle: 250,
            beforeLoad: b,
            afterLoad: b,
            onError: b,
            onFinishedAll: b
        }, e(a).on("load", function() {
            g = !0
        })
    }(window), _page_ready(function(a) {
        function b(a) {
            var b = a.parents(".info-slider-wrapper").find(".info-slider"),
                c = b.children(".selected").removeClass("selected");
            a.hasClass("info-next") ? c.is(":last-child") ? b.children("li").eq(0).addClass("selected") : c.next().addClass("selected") : c.is(":first-child") ? b.children("li").last().addClass("selected") : c.prev().addClass("selected")
        }

        function c(b) {
            a(".info-quick-view .info-slider li").removeClass("selected").find('img[src="' + b + '"]').parent("li").addClass("selected")
        }

        function d() {
            var b = (a(window).width() - a(".info-quick-view").width()) / 2,
                c = (a(window).height() - a(".info-quick-view").height()) / 2;
            a(".info-quick-view").css({
                top: c,
                left: b
            })
        }

        function e(b, c) {
            var d = a(".info-close"),
                e = d.siblings(".info-slider-wrapper").find(".selected img").attr("src"),
                h = a(".empty-box").find("img");
            !a(".info-quick-view").hasClass("velocity-animating") && a(".info-quick-view").hasClass("add-content") ? (h.attr("src", e), f(h, b, c, "close")) : g(h, b, c)
        }

        function f(b, c, d, e) {
            var f = b.parent(".info-item"),
                g = b.offset().top - a(window).scrollTop(),
                h = b.offset().left,
                i = b.width(),
                j = b.height(),
                k = a(window).width(),
                l = a(window).height(),
                m = (k - c) / 2,
                n = c * j / i,
                o = (l - n) / 2,
                p = .8 * k < d ? .8 * k : d,
                q = (k - p) / 2;
            "open" == e ? (f.addClass("empty-box"), a(".info-quick-view").css({
                top: g,
                left: h,
                width: i
            }).velocity({
                top: o + "px",
                left: m + "px",
                width: c + "px"
            }, 1e3, [400, 20], function() {
                a(".info-quick-view").addClass("animate-width").velocity({
                    left: q + "px",
                    width: p + "px"
                }, 300, "ease", function() {
                    a(".info-quick-view").addClass("add-content")
                })
            }).addClass("is-visible")) : a(".info-quick-view").removeClass("add-content").velocity({
                top: o + "px",
                left: m + "px",
                width: c + "px"
            }, 300, "ease", function() {
                a("body").removeClass("overlay-layer"), a(".info-quick-view").removeClass("animate-width").velocity({
                    top: g,
                    left: h,
                    width: i
                }, 500, "ease", function() {
                    a(".info-quick-view").removeClass("is-visible"), f.removeClass("empty-box")
                })
            })
        }

        function g(b, c, d) {
            var e = b.parent(".info-item"),
                f = b.offset().top - a(window).scrollTop(),
                g = b.offset().left,
                h = b.width();
            a("body").removeClass("overlay-layer"), e.removeClass("empty-box"), a(".info-quick-view").velocity("stop").removeClass("add-content animate-width is-visible").css({
                top: f,
                left: g,
                width: h
            })
        }
        a(".info-trigger").on("click", function(b) {
            var d = a(this).parent(".info-item").children("img"),
                e = d.attr("src");
            a(this).data("title"), a(this).data("excerpt");
            a("body").addClass("overlay-layer"), f(d, 400, 900, "open"), c(e)
        }), a("body").on("click", function(b) {
            (a(b.target).is(".info-close") || a(b.target).is("body.overlay-layer")) && e(400, 900)
        }), a(document).keyup(function(a) {
            "27" == a.which && e(400, 900)
        }), a(".info-quick-view").on("click", ".info-slider-navigation a", function() {
            b(a(this))
        }), a(window).on("resize", function() {
            a(".info-quick-view").hasClass("is-visible") && window.requestAnimationFrame(d)
        })
    }),
    function(a, b, c) {
        "function" == typeof define && define.amd ? define(["jquery"], function(d) {
            return c(d, a, b), d.mobile
        }) : c(a.jQuery, a, b)
    }(this, document, function(a, b, c, d) {
        (function(a, b, c, d) {
            function e(a) {
                for (; a && void 0 !== a.originalEvent;) a = a.originalEvent;
                return a
            }

            function f(b, c) {
                var f, g, h, i, j, k, l, m, n, o = b.type;
                if (b = a.Event(b), b.type = c, f = b.originalEvent, g = a.event.props, o.search(/^(mouse|click)/) > -1 && (g = D), f)
                    for (l = g.length, i; l;) i = g[--l], b[i] = f[i];
                if (o.search(/mouse(down|up)|click/) > -1 && !b.which && (b.which = 1), -1 !== o.search(/^touch/) && (h = e(f), o = h.touches, j = h.changedTouches, k = o && o.length ? o[0] : j && j.length ? j[0] : d, k))
                    for (m = 0, n = B.length; m < n; m++) i = B[m], b[i] = k[i];
                return b
            }

            function g(b) {
                for (var c, d, e = {}; b;) {
                    c = a.data(b, y);
                    for (d in c) c[d] && (e[d] = e.hasVirtualBinding = !0);
                    b = b.parentNode
                }
                return e
            }

            function h(b, c) {
                for (var d; b;) {
                    if ((d = a.data(b, y)) && (!c || d[c])) return b;
                    b = b.parentNode
                }
                return null
            }

            function i() {
                L = !1
            }

            function j() {
                L = !0
            }

            function k() {
                P = 0, J.length = 0, K = !1, j()
            }

            function l() {
                i()
            }

            function m() {
                n(), F = setTimeout(function() {
                    F = 0, k()
                }, a.vmouse.resetTimerDuration)
            }

            function n() {
                F && (clearTimeout(F), F = 0)
            }

            function o(b, c, d) {
                var e;
                return (d && d[b] || !d && h(c.target, b)) && (e = f(c, b), a(c.target).trigger(e)), e
            }

            function p(b) {
                var c, d = a.data(b.target, z);
                !K && (!P || P !== d) && (c = o("v" + b.type, b)) && (c.isDefaultPrevented() && b.preventDefault(), c.isPropagationStopped() && b.stopPropagation(), c.isImmediatePropagationStopped() && b.stopImmediatePropagation())
            }

            function q(b) {
                var c, d, f, h = e(b).touches;
                h && 1 === h.length && (c = b.target, d = g(c), d.hasVirtualBinding && (P = O++, a.data(c, z, P), n(), l(), I = !1, f = e(b).touches[0], G = f.pageX, H = f.pageY, o("vmouseover", b, d), o("vmousedown", b, d)))
            }

            function r(a) {
                L || (I || o("vmousecancel", a, g(a.target)), I = !0, m())
            }

            function s(b) {
                if (!L) {
                    var c = e(b).touches[0],
                        d = I,
                        f = a.vmouse.moveDistanceThreshold,
                        h = g(b.target);
                    I = I || Math.abs(c.pageX - G) > f || Math.abs(c.pageY - H) > f, I && !d && o("vmousecancel", b, h), o("vmousemove", b, h), m()
                }
            }

            function t(a) {
                if (!L) {
                    j();
                    var b, c, d = g(a.target);
                    o("vmouseup", a, d), I || (b = o("vclick", a, d)) && b.isDefaultPrevented() && (c = e(a).changedTouches[0], J.push({
                        touchID: P,
                        x: c.clientX,
                        y: c.clientY
                    }), K = !0), o("vmouseout", a, d), I = !1, m()
                }
            }

            function u(b) {
                var c, d = a.data(b, y);
                if (d)
                    for (c in d)
                        if (d[c]) return !0;
                return !1
            }

            function v() {}
            var w, x, y = "virtualMouseBindings",
                z = "virtualTouchID",
                A = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
                B = "clientX clientY pageX pageY screenX screenY".split(" "),
                C = a.event.mouseHooks ? a.event.mouseHooks.props : [],
                D = a.event.props.concat(C),
                E = {},
                F = 0,
                G = 0,
                H = 0,
                I = !1,
                J = [],
                K = !1,
                L = !1,
                M = "addEventListener" in c,
                N = a(c),
                O = 1,
                P = 0;
            for (a.vmouse = {
                    moveDistanceThreshold: 10,
                    clickDistanceThreshold: 10,
                    resetTimerDuration: 1500
                }, x = 0; x < A.length; x++) a.event.special[A[x]] = function(b) {
                var c = b.substr(1);
                return {
                    setup: function() {
                        u(this) || a.data(this, y, {}), a.data(this, y)[b] = !0, E[b] = (E[b] || 0) + 1, 1 === E[b] && N.bind(c, p), a(this).bind(c, v), M && (E.touchstart = (E.touchstart || 0) + 1, 1 === E.touchstart && N.bind("touchstart", q).bind("touchend", t).bind("touchmove", s).bind("scroll", r))
                    },
                    teardown: function() {
                        --E[b], E[b] || N.unbind(c, p), M && (--E.touchstart || N.unbind("touchstart", q).unbind("touchmove", s).unbind("touchend", t).unbind("scroll", r));
                        var d = a(this),
                            e = a.data(this, y);
                        e && (e[b] = !1), d.unbind(c, v), u(this) || d.removeData(y)
                    }
                }
            }(A[x]);
            M && c.addEventListener("click", function(b) {
                var c, d, e, f, g, h = J.length,
                    i = b.target;
                if (h)
                    for (c = b.clientX, d = b.clientY, w = a.vmouse.clickDistanceThreshold, e = i; e;) {
                        for (f = 0; f < h; f++)
                            if (g = J[f], 0, e === i && Math.abs(g.x - c) < w && Math.abs(g.y - d) < w || a.data(e, z) === g.touchID) return b.preventDefault(), void b.stopPropagation();
                        e = e.parentNode
                    }
            }, !0)
        })(a, 0, c),
        function(a) {
            a.mobile = {}
        }(a),
        function(a, b) {
            var d = {
                touch: "ontouchend" in c
            };
            a.mobile.support = a.mobile.support || {}, a.extend(a.support, d), a.extend(a.mobile.support, d)
        }(a),
        function(a, b, d) {
            function e(b, c, e, f) {
                var g = e.type;
                e.type = c, f ? a.event.trigger(e, d, b) : a.event.dispatch.call(b, e), e.type = g
            }
            var f = a(c),
                g = a.mobile.support.touch,
                h = "touchmove scroll",
                i = g ? "touchstart" : "mousedown",
                j = g ? "touchend" : "mouseup",
                k = g ? "touchmove" : "mousemove";
            a.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(b, c) {
                a.fn[c] = function(a) {
                    return a ? this.bind(c, a) : this.trigger(c)
                }, a.attrFn && (a.attrFn[c] = !0)
            }), a.event.special.scrollstart = {
                enabled: !0,
                setup: function() {
                    function b(a, b) {
                        c = b, e(f, c ? "scrollstart" : "scrollstop", a)
                    }
                    var c, d, f = this,
                        g = a(f);
                    g.bind(h, function(e) {
                        a.event.special.scrollstart.enabled && (c || b(e, !0), clearTimeout(d), d = setTimeout(function() {
                            b(e, !1)
                        }, 50))
                    })
                },
                teardown: function() {
                    a(this).unbind(h)
                }
            }, a.event.special.tap = {
                tapholdThreshold: 750,
                emitTapOnTaphold: !0,
                setup: function() {
                    var b = this,
                        c = a(b),
                        d = !1;
                    c.bind("vmousedown", function(g) {
                        function h() {
                            clearTimeout(k)
                        }

                        function i() {
                            h(), c.unbind("vclick", j).unbind("vmouseup", h), f.unbind("vmousecancel", i)
                        }

                        function j(a) {
                            i(), d || l !== a.target ? d && a.preventDefault() : e(b, "tap", a)
                        }
                        if (d = !1, g.which && 1 !== g.which) return !1;
                        var k, l = g.target;
                        c.bind("vmouseup", h).bind("vclick", j), f.bind("vmousecancel", i), k = setTimeout(function() {
                            a.event.special.tap.emitTapOnTaphold || (d = !0), e(b, "taphold", a.Event("taphold", {
                                target: l
                            }))
                        }, a.event.special.tap.tapholdThreshold)
                    })
                },
                teardown: function() {
                    a(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"), f.unbind("vmousecancel")
                }
            }, a.event.special.swipe = {
                scrollSupressionThreshold: 30,
                durationThreshold: 1e3,
                horizontalDistanceThreshold: 30,
                verticalDistanceThreshold: 30,
                getLocation: function(a) {
                    var c = b.pageXOffset,
                        d = b.pageYOffset,
                        e = a.clientX,
                        f = a.clientY;
                    return 0 === a.pageY && Math.floor(f) > Math.floor(a.pageY) || 0 === a.pageX && Math.floor(e) > Math.floor(a.pageX) ? (e -= c, f -= d) : (f < a.pageY - d || e < a.pageX - c) && (e = a.pageX - c, f = a.pageY - d), {
                        x: e,
                        y: f
                    }
                },
                start: function(b) {
                    var c = b.originalEvent.touches ? b.originalEvent.touches[0] : b,
                        d = a.event.special.swipe.getLocation(c);
                    return {
                        time: (new Date).getTime(),
                        coords: [d.x, d.y],
                        origin: a(b.target)
                    }
                },
                stop: function(b) {
                    var c = b.originalEvent.touches ? b.originalEvent.touches[0] : b,
                        d = a.event.special.swipe.getLocation(c);
                    return {
                        time: (new Date).getTime(),
                        coords: [d.x, d.y]
                    }
                },
                handleSwipe: function(b, c, d, f) {
                    if (c.time - b.time < a.event.special.swipe.durationThreshold && Math.abs(b.coords[0] - c.coords[0]) > a.event.special.swipe.horizontalDistanceThreshold && Math.abs(b.coords[1] - c.coords[1]) < a.event.special.swipe.verticalDistanceThreshold) {
                        var g = b.coords[0] > c.coords[0] ? "swipeleft" : "swiperight";
                        return e(d, "swipe", a.Event("swipe", {
                            target: f,
                            swipestart: b,
                            swipestop: c
                        }), !0), e(d, g, a.Event(g, {
                            target: f,
                            swipestart: b,
                            swipestop: c
                        }), !0), !0
                    }
                    return !1
                },
                eventInProgress: !1,
                setup: function() {
                    var b, c = this,
                        d = a(c),
                        e = {};
                    b = a.data(this, "mobile-events"), b || (b = {
                        length: 0
                    }, a.data(this, "mobile-events", b)), b.length++, b.swipe = e, e.start = function(b) {
                        if (!a.event.special.swipe.eventInProgress) {
                            a.event.special.swipe.eventInProgress = !0;
                            var d, g = a.event.special.swipe.start(b),
                                h = b.target,
                                i = !1;
                            e.move = function(b) {
                                g && !b.isDefaultPrevented() && (d = a.event.special.swipe.stop(b), i || (i = a.event.special.swipe.handleSwipe(g, d, c, h)) && (a.event.special.swipe.eventInProgress = !1), Math.abs(g.coords[0] - d.coords[0]) > a.event.special.swipe.scrollSupressionThreshold && b.preventDefault())
                            }, e.stop = function() {
                                i = !0, a.event.special.swipe.eventInProgress = !1, f.off(k, e.move), e.move = null
                            }, f.on(k, e.move).one(j, e.stop)
                        }
                    }, d.on(i, e.start)
                },
                teardown: function() {
                    var b, c;
                    b = a.data(this, "mobile-events"), b && (c = b.swipe, delete b.swipe, 0 === --b.length && a.removeData(this, "mobile-events")), c && (c.start && a(this).off(i, c.start), c.move && f.off(k, c.move), c.stop && f.off(j, c.stop))
                }
            }, a.each({
                scrollstop: "scrollstart",
                taphold: "tap",
                swipeleft: "swipe.left",
                swiperight: "swipe.right"
            }, function(b, c) {
                a.event.special[b] = {
                    setup: function() {
                        a(this).bind(c, a.noop)
                    },
                    teardown: function() {
                        a(this).unbind(c)
                    }
                }
            })
        }(a, this)
    }), _page_ready(function(a) {
        function b() {
            a(".cd-nav-trigger").removeClass("nav-is-visible"), a(".cd-main-header").removeClass("nav-is-visible"), a(".cd-primary-nav").removeClass("nav-is-visible"), a(".menu-item-has-children ul").addClass("is-hidden"), a(".menu-item-has-children a").removeClass("selected"), a(".moves-out").removeClass("moves-out"), a(".cd-main-content").removeClass("nav-is-visible"), a("body").removeClass("overflow-hidden")
        }

        function c(b) {
            "close" === b ? (a(".cd-search").removeClass("is-visible"), a(".cd-search-trigger").removeClass("search-is-visible"), a(".cd-overlay").remove()) : (!a(".cd-main-content .cd-overlay").length > 0 && a(".cd-main-content").prepend('<div class="cd-overlay is-visible"></div>'), a(".cd-search").toggleClass("is-visible"), a(".cd-search-trigger").toggleClass("search-is-visible"), a(window).width() > f && a(".cd-search").hasClass("is-visible") && a(".cd-search").find('input[type="search"]').focus(), a(".cd-search").hasClass("is-visible") ? a(".cd-overlay").addClass("is-visible") : a(".cd-overlay").removeClass("is-visible"))
        }

        function d() {
            var a = window,
                b = "inner";
            return "innerWidth" in window || (b = "client", a = document.documentElement || document.body), a[b + "Width"] >= f
        }

        function e() {
            var b = a(".cd-nav");
            d() ? (b.detach(), b.appendTo(".cd-main-header")) : (b.detach(), b.insertAfter(".cd-main-content"), a("#cd-primary-nav").css("width", "100%"))
        }
        var f = 1170;
        e(), a(window).on("resize", function() {
            window.requestAnimationFrame ? window.requestAnimationFrame(e) : setTimeout(e, 300)
        }), a(".menu-item .sub-menu").prepend('<li class="go-back"><a href="#0">Menu</a></li><li class="see-all"><a href="/">Home</a></li>'), a(".cd-nav-trigger").on("click", function(c) {
            c.preventDefault(), a(".cd-main-content").hasClass("nav-is-visible") ? (a(".cd-primary-nav").animate({
                right: "-" + (window.innerWidth - 50) + "px"
            }, 200), a(".cd-main-header, .cd-main-content").animate({
                right: "0px"
            }, 200).promise().done(function() {
                a(".cd-overlay").remove(), b()
            })) : (a("body").addClass("overflow-hidden"), !a(".cd-main-content .cd-overlay").length > 0 && a(".cd-main-content").prepend('<div class="cd-overlay is-visible"></div>'), a(this).addClass("nav-is-visible"), a("#cd-primary-nav").css("width", window.innerWidth - 50 + "px"), a(".cd-primary-nav").animate({
                right: "0px"
            }, 200), a(".cd-main-header, .cd-main-content").animate({
                right: window.innerWidth - 50 + "px"
            }, 200).promise().done(function() {
                a(".cd-primary-nav").addClass("nav-is-visible"), a(".cd-main-content").addClass("nav-is-visible"), a(".cd-search").removeClass("is-visible"), a(".cd-search-trigger").removeClass("search-is-visible")
            }))
        }), a(".cd-search-trigger").on("click", function(a) {
            a.preventDefault(), c(), b()
        }), a(".cd-overlay").on("swiperight", function() {
            a(".cd-primary-nav").hasClass("nav-is-visible") && (b(), a(".cd-overlay").removeClass("is-visible"))
        }), a(".nav-on-left .cd-overlay").on("swipeleft", function() {
            a(".cd-primary-nav").hasClass("nav-is-visible") && (b(), a(".cd-overlay").removeClass("is-visible"))
        }), a("body").on("click", ".cd-overlay", function() {
            b(), c("close"), a(".cd-overlay").remove()
        }), a(".cd-primary-nav").children(".menu-item-has-children").children("a").on("click", function(a) {
            a.preventDefault()
        }), a(".menu-item-has-children").children("a").on("click", function(b) {
            d() || b.preventDefault();
            var c = a(this);
            c.parent().attr("id");
            c.next("ul").hasClass("is-hidden") ? (console.log('1'),
		c.addClass("selected").next("ul").removeClass("is-hidden").end().parent(".menu-item-has-children").parent("ul").addClass("moves-out"),
	    c.parent(".menu-item-has-children").siblings(".menu-item-has-children").children("ul").addClass("is-hidden").end().children("a").removeClass("selected"),!a(".cd-main-content .cd-overlay").length > 0 && a(".cd-main-content").prepend('<div class="cd-overlay is-visible"></div>')
	     ) : (console.log('2'),
	      	  c.removeClass("selected").next("ul").addClass("is-hidden").end().parent(".menu-item-has-children").parent("ul").removeClass("moves-out"),
		  a(".cd-overlay").remove()
	     ),
	    a(".cd-search").removeClass("is-visible"),
	    a(".cd-search-trigger").removeClass("search-is-visible")
        }), a(".go-back").on("click", function() {
            var b = a(this),
                c = b.parents("li:eq(0)").attr("id");
            a("#" + c).css("height", "auto"), a(this).parent("ul").addClass("is-hidden").parent(".menu-item-has-children").parent("ul").removeClass("moves-out")
        })
    }), _page_ready(function(a) {
        function b(b) {
            var d = b.width() / 2,
                e = b.offset().left + d,
                f = b.offset().top + d - a(window).scrollTop(),
                g = c(f, e, d, a(window).height(), a(window).width());
            return b.css("position", "fixed").velocity({
                top: f - d,
                left: e - d,
                translateX: 0
            }, 0), g
        }

        function c(a, b, c, d, e) {
            var f = b > d / 2 ? b : d - b,
                g = a > e / 2 ? a : e - a;
            return Math.ceil(Math.sqrt(Math.pow(f, 2) + Math.pow(g, 2)) / c)
        }

        function d(b, c, d) {
            b.velocity({
                scale: c
            }, 400, function() {
                a("body").toggleClass("overflow-hidden", d), d ? b.parents(".modal-section").addClass("modal-is-visible").end().off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend") : b.removeClass("is-visible").removeAttr("style").siblings('[data-type="modal-trigger"]').removeClass("to-circle")
            })
        }

        function e() {
            var b = a(".modal-section.modal-is-visible").find(".modal-modal-bg"),
                d = b.width() / 2,
                e = b.siblings(".btn").offset().top + d - a(window).scrollTop(),
                f = b.siblings(".btn").offset().left + d,
                g = c(e, f, d, a(window).height(), a(window).width());
            b.velocity({
                top: e - d,
                left: f - d,
                scale: g
            }, 0)
        }

        function f() {
            var b = a(".modal-section.modal-is-visible");
            b.removeClass("modal-is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                d(b.find(".modal-modal-bg"), 1, !1)
            }), b.parents(".no-csstransitions").length > 0 && d(b.find(".modal-modal-bg"), 1, !1)
        }
        a('[data-type="modal-trigger"]').on("click", function() {
            var c = a(this),
                e = b(c.next(".modal-modal-bg"));
            c.addClass("to-circle"), c.next(".modal-modal-bg").addClass("is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                d(c.next(".modal-modal-bg"), e, !0)
            }), c.parents(".no-csstransitions").length > 0 && d(c.next(".modal-modal-bg"), e, !0)
        }), a(".modal-section .modal-modal-close").on("click", function() {
            f()
        }), a(document).keyup(function(a) {
            "27" == a.which && f()
        }), a(window).on("resize", function() {
            a(".modal-section.modal-is-visible").length > 0 && window.requestAnimationFrame(e)
        })
    }), window.Modernizr = function(a, b, c) {
        function d(a) {
            q.cssText = a
        }

        function e(a, b) {
            return d(u.join(a + ";") + (b || ""))
        }

        function f(a, b) {
            return typeof a === b
        }

        function g(a, b) {
            return !!~("" + a).indexOf(b)
        }

        function h(a, b) {
            for (var d in a) {
                var e = a[d];
                if (!g(e, "-") && q[e] !== c) return "pfx" != b || e
            }
            return !1
        }

        function i(a, b, d) {
            for (var e in a) {
                var g = b[a[e]];
                if (g !== c) return !1 === d ? a[e] : f(g, "function") ? g.bind(d || b) : g
            }
            return !1
        }

        function j(a, b, c) {
            var d = a.charAt(0).toUpperCase() + a.slice(1),
                e = (a + " " + w.join(d + " ") + d).split(" ");
            return f(b, "string") || f(b, "undefined") ? h(e, b) : (e = (a + " " + x.join(d + " ") + d).split(" "), i(e, b, c))
        }
        var k, l, m = {},
            n = b.documentElement,
            o = "modernizr",
            p = b.createElement(o),
            q = p.style,
            r = b.createElement("input"),
            s = ":)",
            t = {}.toString,
            u = " -webkit- -moz- -o- -ms- ".split(" "),
            v = "Webkit Moz O ms",
            w = v.split(" "),
            x = v.toLowerCase().split(" "),
            y = {
                svg: "http://www.w3.org/2000/svg"
            },
            z = {},
            A = {},
            B = {},
            C = [],
            D = C.slice,
            E = function(a, c, d, e) {
                var f, g, h, i, j = b.createElement("div"),
                    k = b.body,
                    l = k || b.createElement("body");
                if (parseInt(d, 10))
                    for (; d--;) h = b.createElement("div"), h.id = e ? e[d] : o + (d + 1), j.appendChild(h);
                return f = ["&#173;", '<style id="s', o, '">', a, "</style>"].join(""), j.id = o, (k ? j : l).innerHTML += f, l.appendChild(j), k || (l.style.background = "", l.style.overflow = "hidden", i = n.style.overflow, n.style.overflow = "hidden", n.appendChild(l)), g = c(j, a), k ? j.parentNode.removeChild(j) : (l.parentNode.removeChild(l), n.style.overflow = i), !!g
            },
            F = function(b) {
                var c = a.matchMedia || a.msMatchMedia;
                if (c) return c(b) && c(b).matches || !1;
                var d;
                return E("@media " + b + " { #" + o + " { position: absolute; } }", function(b) {
                    d = "absolute" == (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle).position
                }), d
            },
            G = function() {
                function a(a, e) {
                    e = e || b.createElement(d[a] || "div"), a = "on" + a;
                    var g = a in e;
                    return g || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(a, ""), g = f(e[a], "function"), f(e[a], "undefined") || (e[a] = c), e.removeAttribute(a))), e = null, g
                }
                var d = {
                    select: "input",
                    change: "input",
                    submit: "form",
                    reset: "form",
                    error: "img",
                    load: "img",
                    abort: "img"
                };
                return a
            }(),
            H = {}.hasOwnProperty;
        l = f(H, "undefined") || f(H.call, "undefined") ? function(a, b) {
            return b in a && f(a.constructor.prototype[b], "undefined")
        } : function(a, b) {
            return H.call(a, b)
        }, Function.prototype.bind || (Function.prototype.bind = function(a) {
            var b = this;
            if ("function" != typeof b) throw new TypeError;
            var c = D.call(arguments, 1),
                d = function() {
                    if (this instanceof d) {
                        var e = function() {};
                        e.prototype = b.prototype;
                        var f = new e,
                            g = b.apply(f, c.concat(D.call(arguments)));
                        return Object(g) === g ? g : f
                    }
                    return b.apply(a, c.concat(D.call(arguments)))
                };
            return d
        }), z.flexbox = function() {
            return j("flexWrap")
        }, z.flexboxlegacy = function() {
            return j("boxDirection")
        }, z.canvas = function() {
            var a = b.createElement("canvas");
            return !(!a.getContext || !a.getContext("2d"))
        }, z.canvastext = function() {
            return !(!m.canvas || !f(b.createElement("canvas").getContext("2d").fillText, "function"))
        }, z.webgl = function() {
            return !!a.WebGLRenderingContext
        }, z.touch = function() {
            var c;
            return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : E(["@media (", u.join("touch-enabled),("), o, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
                c = 9 === a.offsetTop
            }), c
        }, z.geolocation = function() {
            return "geolocation" in navigator
        }, z.postmessage = function() {
            return !!a.postMessage
        }, z.websqldatabase = function() {
            return !!a.openDatabase
        }, z.indexedDB = function() {
            return !!j("indexedDB", a)
        }, z.hashchange = function() {
            return G("hashchange", a) && (b.documentMode === c || b.documentMode > 7)
        }, z.history = function() {
            return !(!a.history || !history.pushState)
        }, z.draganddrop = function() {
            var a = b.createElement("div");
            return "draggable" in a || "ondragstart" in a && "ondrop" in a
        }, z.websockets = function() {
            return "WebSocket" in a || "MozWebSocket" in a
        }, z.rgba = function() {
            return d("background-color:rgba(150,255,150,.5)"), g(q.backgroundColor, "rgba")
        }, z.hsla = function() {
            return d("background-color:hsla(120,40%,100%,.5)"), g(q.backgroundColor, "rgba") || g(q.backgroundColor, "hsla")
        }, z.multiplebgs = function() {
            return d("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(q.background)
        }, z.backgroundsize = function() {
            return j("backgroundSize")
        }, z.borderimage = function() {
            return j("borderImage")
        }, z.borderradius = function() {
            return j("borderRadius")
        }, z.boxshadow = function() {
            return j("boxShadow")
        }, z.textshadow = function() {
            return "" === b.createElement("div").style.textShadow
        }, z.opacity = function() {
            return e("opacity:.55"), /^0.55$/.test(q.opacity)
        }, z.cssanimations = function() {
            return j("animationName")
        }, z.csscolumns = function() {
            return j("columnCount")
        }, z.cssgradients = function() {
            var a = "background-image:";
            return d((a + "-webkit- ".split(" ").join("gradient(linear,left top,right bottom,from(#9f9),to(white));" + a) + u.join("linear-gradient(left top,#9f9, white);" + a)).slice(0, -a.length)), g(q.backgroundImage, "gradient")
        }, z.cssreflections = function() {
            return j("boxReflect")
        }, z.csstransforms = function() {
            return !!j("transform")
        }, z.csstransforms3d = function() {
            var a = !!j("perspective");
            return a && "webkitPerspective" in n.style && E("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b, c) {
                a = 9 === b.offsetLeft && 3 === b.offsetHeight
            }), a
        }, z.csstransitions = function() {
            return j("transition")
        }, z.fontface = function() {
            var a;
            return E('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
                var e = b.getElementById("smodernizr"),
                    f = e.sheet || e.styleSheet,
                    g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
                a = /src/i.test(g) && 0 === g.indexOf(d.split(" ")[0])
            }), a
        }, z.generatedcontent = function() {
            var a;
            return E(["#", o, "{font:0/0 a}#", o, ':after{content:"', s, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) {
                a = b.offsetHeight >= 3
            }), a
        }, z.video = function() {
            var a = b.createElement("video"),
                c = !1;
            try {
                (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
            } catch (a) {}
            return c
        }, z.audio = function() {
            var a = b.createElement("audio"),
                c = !1;
            try {
                (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""))
            } catch (a) {}
            return c
        }, z.localstorage = function() {
            try {
                return localStorage.setItem(o, o), localStorage.removeItem(o), !0
            } catch (a) {
                return !1
            }
        }, z.sessionstorage = function() {
            try {
                return sessionStorage.setItem(o, o), sessionStorage.removeItem(o), !0
            } catch (a) {
                return !1
            }
        }, z.webworkers = function() {
            return !!a.Worker
        }, z.applicationcache = function() {
            return !!a.applicationCache
        }, z.svg = function() {
            return !!b.createElementNS && !!b.createElementNS(y.svg, "svg").createSVGRect
        }, z.inlinesvg = function() {
            var a = b.createElement("div");
            return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == y.svg
        }, z.smil = function() {
            return !!b.createElementNS && /SVGAnimate/.test(t.call(b.createElementNS(y.svg, "animate")))
        }, z.svgclippaths = function() {
            return !!b.createElementNS && /SVGClipPath/.test(t.call(b.createElementNS(y.svg, "clipPath")))
        };
        for (var I in z) l(z, I) && (k = I.toLowerCase(), m[k] = z[I](), C.push((m[k] ? "" : "no-") + k));
        return m.input || function() {
                m.input = function(c) {
                    for (var d = 0, e = c.length; d < e; d++) B[c[d]] = !!(c[d] in r);
                    return B.list && (B.list = !(!b.createElement("datalist") || !a.HTMLDataListElement)), B
                }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), m.inputtypes = function(a) {
                    for (var d, e, f, g = 0, h = a.length; g < h; g++) r.setAttribute("type", e = a[g]), d = "text" !== r.type, d && (r.value = s, r.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(e) && r.style.WebkitAppearance !== c ? (n.appendChild(r), f = b.defaultView, d = f.getComputedStyle && "textfield" !== f.getComputedStyle(r, null).WebkitAppearance && 0 !== r.offsetHeight, n.removeChild(r)) : /^(search|tel)$/.test(e) || (d = /^(url|email)$/.test(e) ? r.checkValidity && !1 === r.checkValidity() : r.value != s)), A[a[g]] = !!d;
                    return A
                }("search tel url email datetime date month week time datetime-local number range color".split(" "))
            }(), m.addTest = function(a, b) {
                if ("object" == typeof a)
                    for (var d in a) l(a, d) && m.addTest(d, a[d]);
                else {
                    if (a = a.toLowerCase(), m[a] !== c) return m;
                    b = "function" == typeof b ? b() : b, n.className += " " + (b ? "" : "no-") + a, m[a] = b
                }
                return m
            }, d(""), p = r = null,
            function(a, b) {
                function c(a, b) {
                    var c = a.createElement("p"),
                        d = a.getElementsByTagName("head")[0] || a.documentElement;
                    return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
                }

                function d() {
                    var a = r.elements;
                    return "string" == typeof a ? a.split(" ") : a
                }

                function e(a) {
                    var b = q[a[o]];
                    return b || (b = {}, p++, a[o] = p, q[p] = b), b
                }

                function f(a, c, d) {
                    if (c || (c = b), k) return c.createElement(a);
                    d || (d = e(c));
                    var f;
                    return f = d.cache[a] ? d.cache[a].cloneNode() : n.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), !f.canHaveChildren || m.test(a) || f.tagUrn ? f : d.frag.appendChild(f)
                }

                function g(a, c) {
                    if (a || (a = b), k) return a.createDocumentFragment();
                    c = c || e(a);
                    for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; g < i; g++) f.createElement(h[g]);
                    return f
                }

                function h(a, b) {
                    b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                        return r.shivMethods ? f(c, a, b) : b.createElem(c)
                    }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/[\w\-]+/g, function(a) {
                        return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                    }) + ");return n}")(r, b.frag)
                }

                function i(a) {
                    a || (a = b);
                    var d = e(a);
                    return !r.shivCSS || j || d.hasCSS || (d.hasCSS = !!c(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || h(a, d), a
                }
                var j, k, l = a.html5 || {},
                    m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    n = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    o = "_html5shiv",
                    p = 0,
                    q = {};
                ! function() {
                    try {
                        var a = b.createElement("a");
                        a.innerHTML = "<xyz></xyz>", j = "hidden" in a, k = 1 == a.childNodes.length || function() {
                            b.createElement("a");
                            var a = b.createDocumentFragment();
                            return void 0 === a.cloneNode || void 0 === a.createDocumentFragment || void 0 === a.createElement
                        }()
                    } catch (a) {
                        j = !0, k = !0
                    }
                }();
                var r = {
                    elements: l.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: "3.7.0",
                    shivCSS: !1 !== l.shivCSS,
                    supportsUnknownElements: k,
                    shivMethods: !1 !== l.shivMethods,
                    type: "default",
                    shivDocument: i,
                    createElement: f,
                    createDocumentFragment: g
                };
                a.html5 = r, i(b)
            }(this, b), m._version = "2.8.3", m._prefixes = u, m._domPrefixes = x, m._cssomPrefixes = w, m.mq = F, m.hasEvent = G, m.testProp = function(a) {
                return h([a])
            }, m.testAllProps = j, m.testStyles = E, m.prefixed = function(a, b, c) {
                return b ? j(a, b, c) : j(a, "pfx")
            }, n.className = n.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + C.join(" "), m
    }(this, this.document), _page_ready(function(a) {
        a(".streamium-list-reviews").live("click", function(b) {
            b.preventDefault(), a(".streamium-review-panel-content").empty(), a(".streamium-review-panel-header h1").empty();
            var c = a(this).attr("data-id"),
                d = a(this).attr("data-nonce");
            a.ajax({
                //url: streamium_object.ajax_url,
		url: [streamium_object.ajax_url, "streamium_get_reviews", c].join('/') + '.json',
                type:"get" ||  "post",
                dataType: "json",
		crossDomain: true,
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: {
                    action: "streamium_get_reviews",
                    post_id: c,
//                    nonce: d
                },
                success: function(b) {
                    if (b.error) return void swal({
                        title: "Error",
                        text: b.message,
                        type: "info",
                        showCancelButton: !1,
                        confirmButtonText: "Ok, thanks!",
                        closeOnConfirm: !0
                    }, function() {});
                    var c = '<ul class="media-list">';
                    a.each(b.data, function(a, b) {
                        var d = b.avatar,
                            e = b.message,
                            f = b.time,
                            g = b.username;
                        c += '<li class="media"><div class="media-left"><a href="#"><img class="media-object" src="' + d + '" alt="' + f + '"></a></div><div class="media-body"><h4 class="media-heading">' + g + '</h4><small class="media-time">' + f + "</small><p>" + e + "</p></div></li>"
                    }), c += "</ul>", a(".streamium-review-panel-content").html(c), a(".streamium-review-panel-header h1").html(b.title + " Reviews"), a(".streamium-review-panel").addClass("is-visible"), a("html, body").addClass("overflow-hidden")
                }
            })
        }), a(".streamium-review-panel").live("click", function(b) {
            (a(b.target).is(".streamium-review-panel") || a(b.target).is(".streamium-review-panel-close")) && (a(".streamium-review-panel").removeClass("is-visible"), a("html, body").removeClass("overflow-hidden"), b.preventDefault())
        }), a(".streamium-review-panel-close").live("click", function(b) {
            a(".streamium-review-panel").removeClass("is-visible"), a("html, body").removeClass("overflow-hidden"), b.preventDefault()
        }), a(".streamium-review-like-btn").live("click", function(b) {
            var c = a(this).attr("data-id"),
                d = a(this).attr("data-nonce");
            return swal({
                title: "Great Glad You Liked It",
                text: "Please tell us why",
                type: "input",
                showCancelButton: !0,
                closeOnConfirm: !1,
                animation: "slide-from-top",
                inputPlaceholder: "Write something"
            }, function(b) {
                return !1 !== b && ("" === b || b.length < 100 ? (swal.showInputError("Please enter over 100 characters!"), !1) : void a.ajax({
                    url: streamium_object.ajax_url,
                    type: "post",
                    dataType: "json",
                    data: {
                        action: "streamium_likes",
                        post_id: c,
                        message: b,
//                        nonce: d
                    },
                    success: function(b) {
                        if (b.error) return void swal({
                            title: "Error",
                            text: b.message,
                            type: "info",
                            showCancelButton: !0,
                            confirmButtonText: "Ok, got it!",
                            closeOnConfirm: !0
                        }, function() {});
                        swal({
                            title: "Success",
                            text: b.message,
                            type: "success",
                            showCancelButton: !0,
                            confirmButtonText: "Ok, got it!",
                            closeOnConfirm: !0
                        }, function() {
                            a("#like-count-" + c).html(b.likes)
                        })
                    }
                }))
            }), !1
        })
    }), _page_ready(function(a) {
	console.log('kkkkkkkkkkkkkkkkkkkkk');
        a(".video-player-streaming")[0] && function() {
            video_post_object.options.youtube ? s3bubble("s3bubble-" + video_post_object.post_id).service(
		Object.assign(video_post_object, {
		codes: video_post_object.codes,
                setIndex: 0,
                startTime: 0
	    })
		// {
                // codes: video_post_object.codes,
                // startTime: video_post_object.percentage,
                // source: {
                //     poster: video_post_object.poster
                // },
                // options: {
                //     autoplay: !0,
                //     fluid: !0
                // },
                // meta: {
                //     backButton: !0,
                //     subTitle: video_post_object.subTitle,
                //     title: video_post_object.title,
                //     para: ""
                // },
                // brand: {
                //     controlbar: video_post_object.brand_control,
                //     icons: video_post_object.brand_icons,
                //     sliders: video_post_object.brand_sliders
                // }
		// }
		, function(b) {
                b.on("timeupdate", function() {
                        var a = this.currentTime(),
                            b = this.duration(),
                            c = a / b * 100;
                        window.percentage = Math.round(parseInt(c))
                    }),
                    function b() {
                        false && a.ajax({
                            url: [streamium_object.ajax_url, "streamium_create_resume" ].join('/') + '.json',
                            type: "get" || "post",
                            dataType: "json",
                            data: {
                                action: "streamium_create_resume",
                                percentage: window.percentage ? window.percentage : 0,
                                post_id: video_post_object.post_id,
//                                nonce: video_post_object.nonce
                            },
                            success: function(a) {
                                setTimeout(b, 1e3)
                            }
                        })
                    }(), b.play()
		}) : s3bubble("s3bubble-" + video_post_object.post_id).video(Object.assign(video_post_object, {
		codes: video_post_object.codes,
                setIndex: 0,
                startTime: 0
	    })
		// {
                // codes: video_post_object.codes,
                // setIndex: parseInt(video_post_object.skip),
                // startTime: video_post_object.percentage,
                // source: {
                //     poster: video_post_object.poster
                // },
                // options: {
                //     autoplay: !0,
                //     fluid: !0,
                //     vpaid: video_post_object.vpaid
                // },
                // meta: {
                //     showSocial: video_post_object.brand_social,
                //     backButton: !0,
                //     subTitle: video_post_object.subTitle,
                //     title: video_post_object.title,
                //     para: ""
                // },
                // brand: {
                //     controlbar: video_post_object.brand_control,
                //     icons: video_post_object.brand_icons,
                //     sliders: video_post_object.brand_sliders
                // }
		// }
		, function(b) {
                b.on("timeupdate", function() {
                        var a = this.currentTime(),
                            b = this.duration(),
                            c = a / b * 100;
                        window.percentage = Math.round(parseInt(c))
                    }),
                    function b() {
                        a.ajax({
//                            url: streamium_object.ajax_url,
			    url: [streamium_object.ajax_url, "streamium_create_resume" ].join('/') + '.json',
                            type: "get" || "post",
                            dataType: "json",
                            data: {
                                action: "streamium_create_resume",
                                percentage: window.percentage ? window.percentage : 0,
                                post_id: video_post_object.post_id,
//                                nonce: video_post_object.nonce
                            },
                            success: function(a) {
                                setTimeout(b, 1e3)
                            }
                        })
                    }()
            }), a(".streamium-season-filter").on("click", function(b) {
                a(this).removeClass("active")
            })
        }(), a(".video-live-streaming")[0] && function() {
            s3bubble("s3bubble-" + video_post_object.post_id).live({
                stream: video_post_object.stream,
                source: {
                    poster: video_post_object.poster
                },
                options: {
                    autoplay: !0,
                    fluid: !0,
                    vpaid: video_post_object.vpaid
                },
                meta: {
                    backButton: !0,
                    subTitle: video_post_object.subTitle,
                    title: video_post_object.title,
                    para: video_post_object.para
                },
                brand: {
                    controlbar: video_post_object.brand_control,
                    icons: video_post_object.brand_icons,
                    sliders: video_post_object.brand_sliders
                }
            }, function(a) {})
        }()
    }), _page_ready(function(a) {
        var b = !1;
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (b = !0), a(".streamium-uploader")[0] && function() {
            0 !== streamium_uploader.length && new plupload.Uploader({
                runtimes: "html5,flash,silverlight,html4",
                url: "https://" + streamium_uploader.bucket + ".s3.amazonaws.com/",
                drop_element: "streamium-uploader",
                browse_button: "streamium-add-to-queue",
                container: document.getElementById("streamium-uploader"),
                flash_swf_url: "/wp-includes/js/plupload/plupload.flash.swf",
                silverlight_xap_url: "/wp-includes/js/plupload/plupload.silverlight.xap",
                urlstream_upload: !0,
                file_data_name: "file",
                multipart: !0,
                multipart_params: {
                    acl: "private",
                    success_action_status: "201",
                    key: "${filename}",
                    Filename: "${filename}",
                    AWSAccessKeyId: streamium_uploader.app,
                    policy: streamium_uploader.policy,
                    signature: streamium_uploader.signature
                },
                filters: {
                    max_file_size: streamium_uploader.filesize,
                    mime_types: [{
                        title: "Allowed files",
                        extensions: streamium_uploader.filetypes
                    }]
                },
                init: {
                    PostInit: function() {},
                    FilesAdded: function(a, b) {},
                    QueueChanged: function(a, b) {
                        a.files.length && a.start()
                    },
                    BeforeUpload: function(a, c) {
                        if (b) {
                            var d = Math.floor(1e4 * Math.random()) + 1 + "_";
                            "" != streamium_uploader.folder ? (a.settings.multipart_params.key = streamium_uploader.folder + "/" + d + c.name, a.settings.multipart_params.Filename = streamium_uploader.folder + "/" + d + c.name) : (a.settings.multipart_params.key = d + c.name, a.settings.multipart_params.Filename = d + c.name)
                        } else "" != streamium_uploader.folder ? (a.settings.multipart_params.key = streamium_uploader.folder + "/" + c.name, a.settings.multipart_params.Filename = streamium_uploader.folder + "/" + c.name) : (a.settings.multipart_params.key = c.name, a.settings.multipart_params.Filename = c.name)
                    },
                    UploadProgress: function(b, c) {
                        a("#streamium-uploader span.streamium-uploader-percent").text(c.percent), a("#streamium-uploader span.streamium-uploader-label").html("Started"), a(".streamium-uploader-progressbar").css("width", c.percent + "%"), a("#streamium-uploader span.streamium-uploader-standby").html(c.percent + "%")
                    },
                    FileUploaded: function(b, c) {
                        b.files.length == b.total.uploaded + b.total.failed && (a("#streamium-uploader span.streamium-uploader-label").html("Uploaded"), a(".streamium-uploader-standby").html("Files successfully uploaded"), a.ajax({
                            url: streamium_object.ajax_url,
                            type: "post",
                            dataType: "json",
                            data: {
                                action: "streamium_user_content_uploader_email",
                                bucket: streamium_uploader.bucket,
                                folder: streamium_uploader.folder,
//                                security: streamium_uploader.nonce
                            },
                            success: function(a) {
                                a.error && console.log(a.message)
                            }
                        }))
                    },
                    StateChanged: function(a, b) {},
                    Error: function(a, b) {}
                }
            }).init()
        }()
    }), _page_ready(function(a) {
        function b() {
            var b = !a(".streamium-drop-dropdown").hasClass("dropdown-is-active");
            a(".streamium-drop-dropdown").toggleClass("dropdown-is-active", b), a(".streamium-drop-dropdown-trigger").toggleClass("dropdown-is-active", b), b || a(".streamium-drop-dropdown").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                a(".move-out").removeClass("move-out"), a(".is-active").removeClass("is-active")
            })
        }
        a(".streamium-drop-dropdown-trigger").on("click", function(a) {
            a.preventDefault(), b()
        }), a(".streamium-drop-dropdown-content li a").on("click", function(a) {
            b()
        }), a(".streamium-drop-dropdown .streamium-drop-close").on("click", function(a) {
            a.preventDefault(), b()
        });
        var c = a(".streamium-drop-dropdown-wrapper").hasClass("open-to-left") ? "left" : "right";
        a(".streamium-drop-dropdown-content").menuAim({
            activate: function(b) {
                a(b).children().addClass("is-active").removeClass("fade-out"), 0 == a(".streamium-drop-dropdown-content .fade-in").length && a(b).children("ul").addClass("fade-in")
            },
            deactivate: function(b) {
                a(b).children().removeClass("is-active"), (0 == a("li.has-children:hover").length || a("li.has-children:hover").is(a(b))) && (a(".streamium-drop-dropdown-content").find(".fade-in").removeClass("fade-in"), a(b).children("ul").addClass("fade-out"))
            },
            exitMenu: function() {
                return a(".streamium-drop-dropdown-content").find(".is-active").removeClass("is-active"), !0
            },
            submenuDirection: c
        })
    }),
    function(a) {
        function b(b) {
            var c = a(this),
                d = null,
                e = [],
                f = null,
                g = null,
                h = a.extend({
                    rowSelector: "> li",
                    submenuSelector: "*",
                    submenuDirection: "right",
                    tolerance: 75,
                    enter: a.noop,
                    exit: a.noop,
                    activate: a.noop,
                    deactivate: a.noop,
                    exitMenu: a.noop
                }, b),
                i = function(a) {
                    e.push({
                        x: a.pageX,
                        y: a.pageY
                    }), e.length > 3 && e.shift()
                },
                j = function() {
                    g && clearTimeout(g), h.exitMenu(this) && (d && h.deactivate(d), d = null)
                },
                k = function() {
                    g && clearTimeout(g), h.enter(this), o(this)
                },
                l = function() {
                    h.exit(this)
                },
                m = function() {
                    n(this)
                },
                n = function(a) {
                    a != d && (d && h.deactivate(d), h.activate(a), d = a)
                },
                o = function(a) {
                    var b = p();
                    b ? g = setTimeout(function() {
                        o(a)
                    }, b) : n(a)
                },
                p = function() {
                    function b(a, b) {
                        return (b.y - a.y) / (b.x - a.x)
                    }
                    if (!d || !a(d).is(h.submenuSelector)) return 0;
                    var g = c.offset(),
                        i = {
                            x: g.left,
                            y: g.top - h.tolerance
                        },
                        j = {
                            x: g.left + c.outerWidth(),
                            y: i.y
                        },
                        k = {
                            x: g.left,
                            y: g.top + c.outerHeight() + h.tolerance
                        },
                        l = {
                            x: g.left + c.outerWidth(),
                            y: k.y
                        },
                        m = e[e.length - 1],
                        n = e[0];
                    if (!m) return 0;
                    if (n || (n = m), n.x < g.left || n.x > l.x || n.y < g.top || n.y > l.y) return 0;
                    if (f && m.x == f.x && m.y == f.y) return 0;
                    var o = j,
                        p = l;
                    "left" == h.submenuDirection ? (o = k, p = i) : "below" == h.submenuDirection ? (o = l, p = k) : "above" == h.submenuDirection && (o = i, p = j);
                    var q = b(m, o),
                        r = b(m, p),
                        s = b(n, o),
                        t = b(n, p);
                    return q < s && r > t ? (f = m, 300) : (f = null, 0)
                };
            c.mouseleave(j).find(h.rowSelector).mouseenter(k).mouseleave(l).click(m), a(document).mousemove(i)
        }
        a.fn.menuAim = function(a) {
            return this.each(function() {
                b.call(this, a)
            }), this
        }
    }(jQuery),
    function(a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
    }(function(a) {
        "use strict";
        var b = window.Slick || {};
        b = function() {
                function b(b, d) {
                    var e, f = this;
                    f.defaults = {
                        accessibility: !0,
                        adaptiveHeight: !1,
                        appendArrows: a(b),
                        appendDots: a(b),
                        arrows: !0,
                        asNavFor: null,
                        prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                        nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                        autoplay: !1,
                        autoplaySpeed: 3e3,
                        centerMode: !1,
                        centerPadding: "50px",
                        cssEase: "ease",
                        customPaging: function(b, c) {
                            return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
                        },
                        dots: !1,
                        dotsClass: "slick-dots",
                        draggable: !0,
                        easing: "linear",
                        edgeFriction: .35,
                        fade: !1,
                        focusOnSelect: !1,
                        infinite: !0,
                        initialSlide: 0,
                        lazyLoad: "ondemand",
                        mobileFirst: !1,
                        pauseOnHover: !0,
                        pauseOnFocus: !0,
                        pauseOnDotsHover: !1,
                        respondTo: "window",
                        responsive: null,
                        rows: 1,
                        rtl: !1,
                        slide: "",
                        slidesPerRow: 1,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 500,
                        swipe: !0,
                        swipeToSlide: !1,
                        touchMove: !0,
                        touchThreshold: 5,
                        useCSS: !0,
                        useTransform: !0,
                        variableWidth: !1,
                        vertical: !1,
                        verticalSwiping: !1,
                        waitForAnimate: !0,
                        zIndex: 1e3
                    }, f.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1
                    }, a.extend(f, f.initials), f.activeBreakpoint = null, f.animType = null, f.animProp = null, f.breakpoints = [], f.breakpointSettings = [], f.cssTransitions = !1, f.focussed = !1, f.interrupted = !1, f.hidden = "hidden", f.paused = !0, f.positionProp = null, f.respondTo = null, f.rowCount = 1, f.shouldClick = !0, f.$slider = a(b), f.$slidesCache = null, f.transformType = null, f.transitionType = null, f.visibilityChange = "visibilitychange", f.windowWidth = 0, f.windowTimer = null, e = a(b).data("slick") || {}, f.options = a.extend({}, f.defaults, d, e), f.currentSlide = f.options.initialSlide, f.originalSettings = f.options, void 0 !== document.mozHidden ? (f.hidden = "mozHidden", f.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (f.hidden = "webkitHidden", f.visibilityChange = "webkitvisibilitychange"), f.autoPlay = a.proxy(f.autoPlay, f), f.autoPlayClear = a.proxy(f.autoPlayClear, f), f.autoPlayIterator = a.proxy(f.autoPlayIterator, f), f.changeSlide = a.proxy(f.changeSlide, f), f.clickHandler = a.proxy(f.clickHandler, f), f.selectHandler = a.proxy(f.selectHandler, f), f.setPosition = a.proxy(f.setPosition, f), f.swipeHandler = a.proxy(f.swipeHandler, f), f.dragHandler = a.proxy(f.dragHandler, f), f.keyHandler = a.proxy(f.keyHandler, f), f.instanceUid = c++, f.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, f.registerBreakpoints(), f.init(!0)
                }
                var c = 0;
                return b
            }(), b.prototype.activateADA = function() {
                this.$slideTrack.find(".slick-active").attr({
                    "aria-hidden": "false"
                }).find("a, input, button, select").attr({
                    tabindex: "0"
                })
            }, b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
                var e = this;
                if ("boolean" == typeof c) d = c, c = null;
                else if (c < 0 || c >= e.slideCount) return !1;
                e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : !0 === d ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function(b, c) {
                    a(c).attr("data-slick-index", b)
                }), e.$slidesCache = e.$slides, e.reinit()
            }, b.prototype.animateHeight = function() {
                var a = this;
                if (1 === a.options.slidesToShow && !0 === a.options.adaptiveHeight && !1 === a.options.vertical) {
                    var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
                    a.$list.animate({
                        height: b
                    }, a.options.speed)
                }
            }, b.prototype.animateSlide = function(b, c) {
                var d = {},
                    e = this;
                e.animateHeight(), !0 === e.options.rtl && !1 === e.options.vertical && (b = -b), !1 === e.transformsEnabled ? !1 === e.options.vertical ? e.$slideTrack.animate({
                    left: b
                }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
                    top: b
                }, e.options.speed, e.options.easing, c) : !1 === e.cssTransitions ? (!0 === e.options.rtl && (e.currentLeft = -e.currentLeft), a({
                    animStart: e.currentLeft
                }).animate({
                    animStart: b
                }, {
                    duration: e.options.speed,
                    easing: e.options.easing,
                    step: function(a) {
                        a = Math.ceil(a), !1 === e.options.vertical ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
                    },
                    complete: function() {
                        c && c.call()
                    }
                })) : (e.applyTransition(), b = Math.ceil(b), !1 === e.options.vertical ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() {
                    e.disableTransition(), c.call()
                }, e.options.speed))
            }, b.prototype.getNavTarget = function() {
                var b = this,
                    c = b.options.asNavFor;
                return c && null !== c && (c = a(c).not(b.$slider)), c
            }, b.prototype.asNavFor = function(b) {
                var c = this,
                    d = c.getNavTarget();
                null !== d && "object" == typeof d && d.each(function() {
                    var c = a(this).slick("getSlick");
                    c.unslicked || c.slideHandler(b, !0)
                })
            }, b.prototype.applyTransition = function(a) {
                var b = this,
                    c = {};
                !1 === b.options.fade ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, !1 === b.options.fade ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
            }, b.prototype.autoPlay = function() {
                var a = this;
                a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
            }, b.prototype.autoPlayClear = function() {
                var a = this;
                a.autoPlayTimer && clearInterval(a.autoPlayTimer)
            }, b.prototype.autoPlayIterator = function() {
                var a = this,
                    b = a.currentSlide + a.options.slidesToScroll;
                a.paused || a.interrupted || a.focussed || (!1 === a.options.infinite && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 == 0 && (a.direction = 1))), a.slideHandler(b))
            }, b.prototype.buildArrows = function() {
                var b = this;
                !0 === b.options.arrows && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), !0 !== b.options.infinite && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
                    "aria-disabled": "true",
                    tabindex: "-1"
                }))
            }, b.prototype.buildDots = function() {
                var b, c, d = this;
                if (!0 === d.options.dots && d.slideCount > d.options.slidesToShow) {
                    for (d.$slider.addClass("slick-dotted"), c = a("<ul />").addClass(d.options.dotsClass), b = 0; b <= d.getDotCount(); b += 1) c.append(a("<li />").append(d.options.customPaging.call(this, d, b)));
                    d.$dots = c.appendTo(d.options.appendDots), d.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
                }
            }, b.prototype.buildOut = function() {
                var b = this;
                b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function(b, c) {
                    a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
                }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), !0 !== b.options.centerMode && !0 !== b.options.swipeToSlide || (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), !0 === b.options.draggable && b.$list.addClass("draggable")
            }, b.prototype.buildRows = function() {
                var a, b, c, d, e, f, g, h = this;
                if (d = document.createDocumentFragment(), f = h.$slider.children(), h.options.rows > 1) {
                    for (g = h.options.slidesPerRow * h.options.rows, e = Math.ceil(f.length / g), a = 0; a < e; a++) {
                        var i = document.createElement("div");
                        for (b = 0; b < h.options.rows; b++) {
                            var j = document.createElement("div");
                            for (c = 0; c < h.options.slidesPerRow; c++) {
                                var k = a * g + (b * h.options.slidesPerRow + c);
                                f.get(k) && j.appendChild(f.get(k))
                            }
                            i.appendChild(j)
                        }
                        d.appendChild(i)
                    }
                    h.$slider.empty().append(d), h.$slider.children().children().children().css({
                        width: 100 / h.options.slidesPerRow + "%",
                        display: "inline-block"
                    })
                }
            }, b.prototype.checkResponsive = function(b, c) {
                var d, e, f, g = this,
                    h = !1,
                    i = g.$slider.width(),
                    j = window.innerWidth || a(window).width();
                if ("window" === g.respondTo ? f = j : "slider" === g.respondTo ? f = i : "min" === g.respondTo && (f = Math.min(j, i)), g.options.responsive && g.options.responsive.length && null !== g.options.responsive) {
                    e = null;
                    for (d in g.breakpoints) g.breakpoints.hasOwnProperty(d) && (!1 === g.originalSettings.mobileFirst ? f < g.breakpoints[d] && (e = g.breakpoints[d]) : f > g.breakpoints[d] && (e = g.breakpoints[d]));
                    null !== e ? null !== g.activeBreakpoint ? (e !== g.activeBreakpoint || c) && (g.activeBreakpoint = e, "unslick" === g.breakpointSettings[e] ? g.unslick(e) : (g.options = a.extend({}, g.originalSettings, g.breakpointSettings[e]), !0 === b && (g.currentSlide = g.options.initialSlide), g.refresh(b)), h = e) : (g.activeBreakpoint = e, "unslick" === g.breakpointSettings[e] ? g.unslick(e) : (g.options = a.extend({}, g.originalSettings, g.breakpointSettings[e]), !0 === b && (g.currentSlide = g.options.initialSlide), g.refresh(b)), h = e) : null !== g.activeBreakpoint && (g.activeBreakpoint = null, g.options = g.originalSettings, !0 === b && (g.currentSlide = g.options.initialSlide), g.refresh(b), h = e), b || !1 === h || g.$slider.trigger("breakpoint", [g, h])
                }
            }, b.prototype.changeSlide = function(b, c) {
                var d, e, f, g = this,
                    h = a(b.currentTarget);
                switch (h.is("a") && b.preventDefault(), h.is("li") || (h = h.closest("li")), f = g.slideCount % g.options.slidesToScroll != 0, d = f ? 0 : (g.slideCount - g.currentSlide) % g.options.slidesToScroll, b.data.message) {
                    case "previous":
                        e = 0 === d ? g.options.slidesToScroll : g.options.slidesToShow - d, g.slideCount > g.options.slidesToShow && g.slideHandler(g.currentSlide - e, !1, c);
                        break;
                    case "next":
                        e = 0 === d ? g.options.slidesToScroll : d, g.slideCount > g.options.slidesToShow && g.slideHandler(g.currentSlide + e, !1, c);
                        break;
                    case "index":
                        var i = 0 === b.data.index ? 0 : b.data.index || h.index() * g.options.slidesToScroll;
                        g.slideHandler(g.checkNavigable(i), !1, c), h.children().trigger("focus");
                        break;
                    default:
                        return
                }
            }, b.prototype.checkNavigable = function(a) {
                var b, c, d = this;
                if (b = d.getNavigableIndexes(), c = 0, a > b[b.length - 1]) a = b[b.length - 1];
                else
                    for (var e in b) {
                        if (a < b[e]) {
                            a = c;
                            break
                        }
                        c = b[e]
                    }
                return a
            }, b.prototype.cleanUpEvents = function() {
                var b = this;
                b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), !0 === b.options.arrows && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), !0 === b.options.accessibility && b.$list.off("keydown.slick", b.keyHandler), !0 === b.options.focusOnSelect && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
            }, b.prototype.cleanUpSlideEvents = function() {
                var b = this;
                b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
            }, b.prototype.cleanUpRows = function() {
                var a, b = this;
                b.options.rows > 1 && (a = b.$slides.children().children(), a.removeAttr("style"), b.$slider.empty().append(a))
            }, b.prototype.clickHandler = function(a) {
                !1 === this.shouldClick && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
            }, b.prototype.destroy = function(b) {
                var c = this;
                c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                    a(this).attr("style", a(this).data("originalStyling"))
                }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
            }, b.prototype.disableTransition = function(a) {
                var b = this,
                    c = {};
                c[b.transitionType] = "", !1 === b.options.fade ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
            }, b.prototype.fadeSlide = function(a, b) {
                var c = this;
                !1 === c.cssTransitions ? (c.$slides.eq(a).css({
                    zIndex: c.options.zIndex
                }), c.$slides.eq(a).animate({
                    opacity: 1
                }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
                    opacity: 1,
                    zIndex: c.options.zIndex
                }), b && setTimeout(function() {
                    c.disableTransition(a), b.call()
                }, c.options.speed))
            }, b.prototype.fadeSlideOut = function(a) {
                var b = this;
                !1 === b.cssTransitions ? b.$slides.eq(a).animate({
                    opacity: 0,
                    zIndex: b.options.zIndex - 2
                }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
                    opacity: 0,
                    zIndex: b.options.zIndex - 2
                }))
            }, b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
                var b = this;
                null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
            }, b.prototype.focusHandler = function() {
                var b = this;
                b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(c) {
                    c.stopImmediatePropagation();
                    var d = a(this);
                    setTimeout(function() {
                        b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay())
                    }, 0)
                })
            }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
                return this.currentSlide
            }, b.prototype.getDotCount = function() {
                var a = this,
                    b = 0,
                    c = 0,
                    d = 0;
                if (!0 === a.options.infinite)
                    for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
                else if (!0 === a.options.centerMode) d = a.slideCount;
                else if (a.options.asNavFor)
                    for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
                else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
                return d - 1
            }, b.prototype.getLeft = function(a) {
                var b, c, d, e = this,
                    f = 0;
                return e.slideOffset = 0, c = e.$slides.first().outerHeight(!0), !0 === e.options.infinite ? (e.slideCount > e.options.slidesToShow && (e.slideOffset = e.slideWidth * e.options.slidesToShow * -1, f = c * e.options.slidesToShow * -1), e.slideCount % e.options.slidesToScroll != 0 && a + e.options.slidesToScroll > e.slideCount && e.slideCount > e.options.slidesToShow && (a > e.slideCount ? (e.slideOffset = (e.options.slidesToShow - (a - e.slideCount)) * e.slideWidth * -1, f = (e.options.slidesToShow - (a - e.slideCount)) * c * -1) : (e.slideOffset = e.slideCount % e.options.slidesToScroll * e.slideWidth * -1, f = e.slideCount % e.options.slidesToScroll * c * -1))) : a + e.options.slidesToShow > e.slideCount && (e.slideOffset = (a + e.options.slidesToShow - e.slideCount) * e.slideWidth, f = (a + e.options.slidesToShow - e.slideCount) * c), e.slideCount <= e.options.slidesToShow && (e.slideOffset = 0, f = 0), !0 === e.options.centerMode && !0 === e.options.infinite ? e.slideOffset += e.slideWidth * Math.floor(e.options.slidesToShow / 2) - e.slideWidth : !0 === e.options.centerMode && (e.slideOffset = 0, e.slideOffset += e.slideWidth * Math.floor(e.options.slidesToShow / 2)), b = !1 === e.options.vertical ? a * e.slideWidth * -1 + e.slideOffset : a * c * -1 + f, !0 === e.options.variableWidth && (d = e.slideCount <= e.options.slidesToShow || !1 === e.options.infinite ? e.$slideTrack.children(".slick-slide").eq(a) : e.$slideTrack.children(".slick-slide").eq(a + e.options.slidesToShow), b = !0 === e.options.rtl ? d[0] ? -1 * (e.$slideTrack.width() - d[0].offsetLeft - d.width()) : 0 : d[0] ? -1 * d[0].offsetLeft : 0, !0 === e.options.centerMode && (d = e.slideCount <= e.options.slidesToShow || !1 === e.options.infinite ? e.$slideTrack.children(".slick-slide").eq(a) : e.$slideTrack.children(".slick-slide").eq(a + e.options.slidesToShow + 1), b = !0 === e.options.rtl ? d[0] ? -1 * (e.$slideTrack.width() - d[0].offsetLeft - d.width()) : 0 : d[0] ? -1 * d[0].offsetLeft : 0, b += (e.$list.width() - d.outerWidth()) / 2)), b
            }, b.prototype.getOption = b.prototype.slickGetOption = function(a) {
                return this.options[a]
            }, b.prototype.getNavigableIndexes = function() {
                var a, b = this,
                    c = 0,
                    d = 0,
                    e = [];
                for (!1 === b.options.infinite ? a = b.slideCount : (c = -1 * b.options.slidesToScroll, d = -1 * b.options.slidesToScroll, a = 2 * b.slideCount); c < a;) e.push(c), c = d + b.options.slidesToScroll, d += b.options.slidesToScroll <= b.options.slidesToShow ? b.options.slidesToScroll : b.options.slidesToShow;
                return e
            },
            b.prototype.getSlick = function() {
                return this
            }, b.prototype.getSlideCount = function() {
                var b, c, d = this;
                return c = !0 === d.options.centerMode ? d.slideWidth * Math.floor(d.options.slidesToShow / 2) : 0, !0 === d.options.swipeToSlide ? (d.$slideTrack.find(".slick-slide").each(function(e, f) {
                    if (f.offsetLeft - c + a(f).outerWidth() / 2 > -1 * d.swipeLeft) return b = f, !1
                }), Math.abs(a(b).attr("data-slick-index") - d.currentSlide) || 1) : d.options.slidesToScroll
            }, b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
                this.changeSlide({
                    data: {
                        message: "index",
                        index: parseInt(a)
                    }
                }, b)
            }, b.prototype.init = function(b) {
                var c = this;
                a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), !0 === c.options.accessibility && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
            }, b.prototype.initADA = function() {
                var b = this;
                b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
                    "aria-hidden": "true",
                    tabindex: "-1"
                }).find("a, input, button, select").attr({
                    tabindex: "-1"
                }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
                    a(this).attr({
                        role: "option",
                        "aria-describedby": "slick-slide" + b.instanceUid + c
                    })
                }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) {
                    a(this).attr({
                        role: "presentation",
                        "aria-selected": "false",
                        "aria-controls": "navigation" + b.instanceUid + c,
                        id: "slick-slide" + b.instanceUid + c
                    })
                }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
            }, b.prototype.initArrowEvents = function() {
                var a = this;
                !0 === a.options.arrows && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
                    message: "previous"
                }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {
                    message: "next"
                }, a.changeSlide))
            }, b.prototype.initDotEvents = function() {
                var b = this;
                !0 === b.options.dots && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
                    message: "index"
                }, b.changeSlide), !0 === b.options.dots && !0 === b.options.pauseOnDotsHover && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
            }, b.prototype.initSlideEvents = function() {
                var b = this;
                b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
            }, b.prototype.initializeEvents = function() {
                var b = this;
                b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {
                    action: "start"
                }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
                    action: "move"
                }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
                    action: "end"
                }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
                    action: "end"
                }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), !0 === b.options.accessibility && b.$list.on("keydown.slick", b.keyHandler), !0 === b.options.focusOnSelect && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
            }, b.prototype.initUI = function() {
                var a = this;
                !0 === a.options.arrows && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), !0 === a.options.dots && a.slideCount > a.options.slidesToShow && a.$dots.show()
            }, b.prototype.keyHandler = function(a) {
                var b = this;
                a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && !0 === b.options.accessibility ? b.changeSlide({
                    data: {
                        message: !0 === b.options.rtl ? "next" : "previous"
                    }
                }) : 39 === a.keyCode && !0 === b.options.accessibility && b.changeSlide({
                    data: {
                        message: !0 === b.options.rtl ? "previous" : "next"
                    }
                }))
            }, b.prototype.lazyLoad = function() {
                function b(b) {
                    a("img[data-lazy]", b).each(function() {
                        var b = a(this),
                            c = a(this).attr("data-lazy"),
                            d = document.createElement("img");
                        d.onload = function() {
                            b.animate({
                                opacity: 0
                            }, 100, function() {
                                b.attr("src", c).animate({
                                    opacity: 1
                                }, 200, function() {
                                    b.removeAttr("data-lazy").removeClass("slick-loading")
                                }), g.$slider.trigger("lazyLoaded", [g, b, c])
                            })
                        }, d.onerror = function() {
                            b.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), g.$slider.trigger("lazyLoadError", [g, b, c])
                        }, d.src = c
                    })
                }
                var c, d, e, f, g = this;
                !0 === g.options.centerMode ? !0 === g.options.infinite ? (e = g.currentSlide + (g.options.slidesToShow / 2 + 1), f = e + g.options.slidesToShow + 2) : (e = Math.max(0, g.currentSlide - (g.options.slidesToShow / 2 + 1)), f = g.options.slidesToShow / 2 + 1 + 2 + g.currentSlide) : (e = g.options.infinite ? g.options.slidesToShow + g.currentSlide : g.currentSlide, f = Math.ceil(e + g.options.slidesToShow), !0 === g.options.fade && (e > 0 && e--, f <= g.slideCount && f++)), c = g.$slider.find(".slick-slide").slice(e, f), b(c), g.slideCount <= g.options.slidesToShow ? (d = g.$slider.find(".slick-slide"), b(d)) : g.currentSlide >= g.slideCount - g.options.slidesToShow ? (d = g.$slider.find(".slick-cloned").slice(0, g.options.slidesToShow), b(d)) : 0 === g.currentSlide && (d = g.$slider.find(".slick-cloned").slice(-1 * g.options.slidesToShow), b(d))
            }, b.prototype.loadSlider = function() {
                var a = this;
                a.setPosition(), a.$slideTrack.css({
                    opacity: 1
                }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
            }, b.prototype.next = b.prototype.slickNext = function() {
                this.changeSlide({
                    data: {
                        message: "next"
                    }
                })
            }, b.prototype.orientationChange = function() {
                var a = this;
                a.checkResponsive(), a.setPosition()
            }, b.prototype.pause = b.prototype.slickPause = function() {
                var a = this;
                a.autoPlayClear(), a.paused = !0
            }, b.prototype.play = b.prototype.slickPlay = function() {
                var a = this;
                a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
            }, b.prototype.postSlide = function(a) {
                var b = this;
                b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), !0 === b.options.accessibility && b.initADA())
            }, b.prototype.prev = b.prototype.slickPrev = function() {
                this.changeSlide({
                    data: {
                        message: "previous"
                    }
                })
            }, b.prototype.preventDefault = function(a) {
                a.preventDefault()
            }, b.prototype.progressiveLazyLoad = function(b) {
                b = b || 1;
                var c, d, e, f = this,
                    g = a("img[data-lazy]", f.$slider);
                g.length ? (c = g.first(), d = c.attr("data-lazy"), e = document.createElement("img"), e.onload = function() {
                    c.attr("src", d).removeAttr("data-lazy").removeClass("slick-loading"), !0 === f.options.adaptiveHeight && f.setPosition(), f.$slider.trigger("lazyLoaded", [f, c, d]), f.progressiveLazyLoad()
                }, e.onerror = function() {
                    b < 3 ? setTimeout(function() {
                        f.progressiveLazyLoad(b + 1)
                    }, 500) : (c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), f.$slider.trigger("lazyLoadError", [f, c, d]), f.progressiveLazyLoad())
                }, e.src = d) : f.$slider.trigger("allImagesLoaded", [f])
            }, b.prototype.refresh = function(b) {
                var c, d, e = this;
                d = e.slideCount - e.options.slidesToShow, !e.options.infinite && e.currentSlide > d && (e.currentSlide = d), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), c = e.currentSlide, e.destroy(!0), a.extend(e, e.initials, {
                    currentSlide: c
                }), e.init(), b || e.changeSlide({
                    data: {
                        message: "index",
                        index: c
                    }
                }, !1)
            }, b.prototype.registerBreakpoints = function() {
                var b, c, d, e = this,
                    f = e.options.responsive || null;
                if ("array" === a.type(f) && f.length) {
                    e.respondTo = e.options.respondTo || "window";
                    for (b in f)
                        if (d = e.breakpoints.length - 1, c = f[b].breakpoint, f.hasOwnProperty(b)) {
                            for (; d >= 0;) e.breakpoints[d] && e.breakpoints[d] === c && e.breakpoints.splice(d, 1), d--;
                            e.breakpoints.push(c), e.breakpointSettings[c] = f[b].settings
                        }
                    e.breakpoints.sort(function(a, b) {
                        return e.options.mobileFirst ? a - b : b - a
                    })
                }
            }, b.prototype.reinit = function() {
                var b = this;
                b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), !0 === b.options.focusOnSelect && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
            }, b.prototype.resize = function() {
                var b = this;
                a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() {
                    b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
                }, 50))
            }, b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
                var d = this;
                if ("boolean" == typeof a ? (b = a, a = !0 === b ? 0 : d.slideCount - 1) : a = !0 === b ? --a : a, d.slideCount < 1 || a < 0 || a > d.slideCount - 1) return !1;
                d.unload(), !0 === c ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, d.reinit()
            }, b.prototype.setCSS = function(a) {
                var b, c, d = this,
                    e = {};
                !0 === d.options.rtl && (a = -a), b = "left" == d.positionProp ? Math.ceil(a) + "px" : "0px", c = "top" == d.positionProp ? Math.ceil(a) + "px" : "0px", e[d.positionProp] = a, !1 === d.transformsEnabled ? d.$slideTrack.css(e) : (e = {}, !1 === d.cssTransitions ? (e[d.animType] = "translate(" + b + ", " + c + ")", d.$slideTrack.css(e)) : (e[d.animType] = "translate3d(" + b + ", " + c + ", 0px)", d.$slideTrack.css(e)))
            }, b.prototype.setDimensions = function() {
                var a = this;
                !1 === a.options.vertical ? !0 === a.options.centerMode && a.$list.css({
                    padding: "0px " + a.options.centerPadding
                }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), !0 === a.options.centerMode && a.$list.css({
                    padding: a.options.centerPadding + " 0px"
                })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), !1 === a.options.vertical && !1 === a.options.variableWidth ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : !0 === a.options.variableWidth ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
                var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
                !1 === a.options.variableWidth && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
            }, b.prototype.setFade = function() {
                var b, c = this;
                c.$slides.each(function(d, e) {
                    b = c.slideWidth * d * -1, !0 === c.options.rtl ? a(e).css({
                        position: "relative",
                        right: b,
                        top: 0,
                        zIndex: c.options.zIndex - 2,
                        opacity: 0
                    }) : a(e).css({
                        position: "relative",
                        left: b,
                        top: 0,
                        zIndex: c.options.zIndex - 2,
                        opacity: 0
                    })
                }), c.$slides.eq(c.currentSlide).css({
                    zIndex: c.options.zIndex - 1,
                    opacity: 1
                })
            }, b.prototype.setHeight = function() {
                var a = this;
                if (1 === a.options.slidesToShow && !0 === a.options.adaptiveHeight && !1 === a.options.vertical) {
                    var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
                    a.$list.css("height", b)
                }
            }, b.prototype.setOption = b.prototype.slickSetOption = function() {
                var b, c, d, e, f, g = this,
                    h = !1;
                if ("object" === a.type(arguments[0]) ? (d = arguments[0], h = arguments[1], f = "multiple") : "string" === a.type(arguments[0]) && (d = arguments[0], e = arguments[1], h = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? f = "responsive" : void 0 !== arguments[1] && (f = "single")), "single" === f) g.options[d] = e;
                else if ("multiple" === f) a.each(d, function(a, b) {
                    g.options[a] = b
                });
                else if ("responsive" === f)
                    for (c in e)
                        if ("array" !== a.type(g.options.responsive)) g.options.responsive = [e[c]];
                        else {
                            for (b = g.options.responsive.length - 1; b >= 0;) g.options.responsive[b].breakpoint === e[c].breakpoint && g.options.responsive.splice(b, 1), b--;
                            g.options.responsive.push(e[c])
                        }
                h && (g.unload(), g.reinit())
            }, b.prototype.setPosition = function() {
                var a = this;
                a.setDimensions(), a.setHeight(), !1 === a.options.fade ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
            }, b.prototype.setProps = function() {
                var a = this,
                    b = document.body.style;
                a.positionProp = !0 === a.options.vertical ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), void 0 === b.WebkitTransition && void 0 === b.MozTransition && void 0 === b.msTransition || !0 === a.options.useCSS && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && !1 !== a.animType && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && !1 !== a.animType
            }, b.prototype.setSlideClasses = function(a) {
                var b, c, d, e, f = this;
                c = f.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), f.$slides.eq(a).addClass("slick-current"), !0 === f.options.centerMode ? (b = Math.floor(f.options.slidesToShow / 2), !0 === f.options.infinite && (a >= b && a <= f.slideCount - 1 - b ? f.$slides.slice(a - b, a + b + 1).addClass("slick-active").attr("aria-hidden", "false") : (d = f.options.slidesToShow + a, c.slice(d - b + 1, d + b + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? c.eq(c.length - 1 - f.options.slidesToShow).addClass("slick-center") : a === f.slideCount - 1 && c.eq(f.options.slidesToShow).addClass("slick-center")), f.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= f.slideCount - f.options.slidesToShow ? f.$slides.slice(a, a + f.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : c.length <= f.options.slidesToShow ? c.addClass("slick-active").attr("aria-hidden", "false") : (e = f.slideCount % f.options.slidesToShow, d = !0 === f.options.infinite ? f.options.slidesToShow + a : a, f.options.slidesToShow == f.options.slidesToScroll && f.slideCount - a < f.options.slidesToShow ? c.slice(d - (f.options.slidesToShow - e), d + e).addClass("slick-active").attr("aria-hidden", "false") : c.slice(d, d + f.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === f.options.lazyLoad && f.lazyLoad()
            }, b.prototype.setupInfinite = function() {
                var b, c, d, e = this;
                if (!0 === e.options.fade && (e.options.centerMode = !1), !0 === e.options.infinite && !1 === e.options.fade && (c = null, e.slideCount > e.options.slidesToShow)) {
                    for (d = !0 === e.options.centerMode ? e.options.slidesToShow + 1 : e.options.slidesToShow, b = e.slideCount; b > e.slideCount - d; b -= 1) c = b - 1, a(e.$slides[c]).clone(!0).attr("id", "").attr("data-slick-index", c - e.slideCount).prependTo(e.$slideTrack).addClass("slick-cloned");
                    for (b = 0; b < d; b += 1) c = b, a(e.$slides[c]).clone(!0).attr("id", "").attr("data-slick-index", c + e.slideCount).appendTo(e.$slideTrack).addClass("slick-cloned");
                    e.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                        a(this).attr("id", "")
                    })
                }
            }, b.prototype.interrupt = function(a) {
                var b = this;
                a || b.autoPlay(), b.interrupted = a
            }, b.prototype.selectHandler = function(b) {
                var c = this,
                    d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
                    e = parseInt(d.attr("data-slick-index"));
                if (e || (e = 0), c.slideCount <= c.options.slidesToShow) return c.setSlideClasses(e), void c.asNavFor(e);
                c.slideHandler(e)
            }, b.prototype.slideHandler = function(a, b, c) {
                var d, e, f, g, h, i = null,
                    j = this;
                if (b = b || !1, (!0 !== j.animating || !0 !== j.options.waitForAnimate) && !(!0 === j.options.fade && j.currentSlide === a || j.slideCount <= j.options.slidesToShow)) {
                    if (!1 === b && j.asNavFor(a), d = a, i = j.getLeft(d), g = j.getLeft(j.currentSlide), j.currentLeft = null === j.swipeLeft ? g : j.swipeLeft, !1 === j.options.infinite && !1 === j.options.centerMode && (a < 0 || a > j.getDotCount() * j.options.slidesToScroll)) return void(!1 === j.options.fade && (d = j.currentSlide, !0 !== c ? j.animateSlide(g, function() {
                        j.postSlide(d)
                    }) : j.postSlide(d)));
                    if (!1 === j.options.infinite && !0 === j.options.centerMode && (a < 0 || a > j.slideCount - j.options.slidesToScroll)) return void(!1 === j.options.fade && (d = j.currentSlide, !0 !== c ? j.animateSlide(g, function() {
                        j.postSlide(d)
                    }) : j.postSlide(d)));
                    if (j.options.autoplay && clearInterval(j.autoPlayTimer), e = d < 0 ? j.slideCount % j.options.slidesToScroll != 0 ? j.slideCount - j.slideCount % j.options.slidesToScroll : j.slideCount + d : d >= j.slideCount ? j.slideCount % j.options.slidesToScroll != 0 ? 0 : d - j.slideCount : d, j.animating = !0, j.$slider.trigger("beforeChange", [j, j.currentSlide, e]), f = j.currentSlide, j.currentSlide = e, j.setSlideClasses(j.currentSlide), j.options.asNavFor && (h = j.getNavTarget(), h = h.slick("getSlick"), h.slideCount <= h.options.slidesToShow && h.setSlideClasses(j.currentSlide)), j.updateDots(), j.updateArrows(), !0 === j.options.fade) return !0 !== c ? (j.fadeSlideOut(f), j.fadeSlide(e, function() {
                        j.postSlide(e)
                    })) : j.postSlide(e), void j.animateHeight();
                    !0 !== c ? j.animateSlide(i, function() {
                        j.postSlide(e)
                    }) : j.postSlide(e)
                }
            }, b.prototype.startLoad = function() {
                var a = this;
                !0 === a.options.arrows && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), !0 === a.options.dots && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
            }, b.prototype.swipeDirection = function() {
                var a, b, c, d, e = this;
                return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), d < 0 && (d = 360 - Math.abs(d)), d <= 45 && d >= 0 ? !1 === e.options.rtl ? "left" : "right" : d <= 360 && d >= 315 ? !1 === e.options.rtl ? "left" : "right" : d >= 135 && d <= 225 ? !1 === e.options.rtl ? "right" : "left" : !0 === e.options.verticalSwiping ? d >= 35 && d <= 135 ? "down" : "up" : "vertical"
            }, b.prototype.swipeEnd = function(a) {
                var b, c, d = this;
                if (d.dragging = !1, d.interrupted = !1, d.shouldClick = !(d.touchObject.swipeLength > 10), void 0 === d.touchObject.curX) return !1;
                if (!0 === d.touchObject.edgeHit && d.$slider.trigger("edge", [d, d.swipeDirection()]), d.touchObject.swipeLength >= d.touchObject.minSwipe) {
                    switch (c = d.swipeDirection()) {
                        case "left":
                        case "down":
                            b = d.options.swipeToSlide ? d.checkNavigable(d.currentSlide + d.getSlideCount()) : d.currentSlide + d.getSlideCount(), d.currentDirection = 0;
                            break;
                        case "right":
                        case "up":
                            b = d.options.swipeToSlide ? d.checkNavigable(d.currentSlide - d.getSlideCount()) : d.currentSlide - d.getSlideCount(), d.currentDirection = 1
                    }
                    "vertical" != c && (d.slideHandler(b), d.touchObject = {}, d.$slider.trigger("swipe", [d, c]))
                } else d.touchObject.startX !== d.touchObject.curX && (d.slideHandler(d.currentSlide), d.touchObject = {})
            }, b.prototype.swipeHandler = function(a) {
                var b = this;
                if (!(!1 === b.options.swipe || "ontouchend" in document && !1 === b.options.swipe || !1 === b.options.draggable && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, !0 === b.options.verticalSwiping && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
                    case "start":
                        b.swipeStart(a);
                        break;
                    case "move":
                        b.swipeMove(a);
                        break;
                    case "end":
                        b.swipeEnd(a)
                }
            }, b.prototype.swipeMove = function(a) {
                var b, c, d, e, f, g = this;
                return f = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !(!g.dragging || f && 1 !== f.length) && (b = g.getLeft(g.currentSlide), g.touchObject.curX = void 0 !== f ? f[0].pageX : a.clientX, g.touchObject.curY = void 0 !== f ? f[0].pageY : a.clientY, g.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(g.touchObject.curX - g.touchObject.startX, 2))), !0 === g.options.verticalSwiping && (g.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(g.touchObject.curY - g.touchObject.startY, 2)))), "vertical" !== (c = g.swipeDirection()) ? (void 0 !== a.originalEvent && g.touchObject.swipeLength > 4 && a.preventDefault(), e = (!1 === g.options.rtl ? 1 : -1) * (g.touchObject.curX > g.touchObject.startX ? 1 : -1), !0 === g.options.verticalSwiping && (e = g.touchObject.curY > g.touchObject.startY ? 1 : -1), d = g.touchObject.swipeLength, g.touchObject.edgeHit = !1, !1 === g.options.infinite && (0 === g.currentSlide && "right" === c || g.currentSlide >= g.getDotCount() && "left" === c) && (d = g.touchObject.swipeLength * g.options.edgeFriction, g.touchObject.edgeHit = !0), !1 === g.options.vertical ? g.swipeLeft = b + d * e : g.swipeLeft = b + d * (g.$list.height() / g.listWidth) * e, !0 === g.options.verticalSwiping && (g.swipeLeft = b + d * e), !0 !== g.options.fade && !1 !== g.options.touchMove && (!0 === g.animating ? (g.swipeLeft = null, !1) : void g.setCSS(g.swipeLeft))) : void 0)
            }, b.prototype.swipeStart = function(a) {
                var b, c = this;
                if (c.interrupted = !0, 1 !== c.touchObject.fingerCount || c.slideCount <= c.options.slidesToShow) return c.touchObject = {}, !1;
                void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (b = a.originalEvent.touches[0]), c.touchObject.startX = c.touchObject.curX = void 0 !== b ? b.pageX : a.clientX, c.touchObject.startY = c.touchObject.curY = void 0 !== b ? b.pageY : a.clientY, c.dragging = !0
            }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
                var a = this;
                null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
            }, b.prototype.unload = function() {
                var b = this;
                a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
            }, b.prototype.unslick = function(a) {
                var b = this;
                b.$slider.trigger("unslick", [b, a]), b.destroy()
            }, b.prototype.updateArrows = function() {
                var a = this;
                Math.floor(a.options.slidesToShow / 2), !0 === a.options.arrows && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && !1 === a.options.centerMode ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && !0 === a.options.centerMode && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
            }, b.prototype.updateDots = function() {
                var a = this;
                null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
            }, b.prototype.visibility = function() {
                var a = this;
                a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
            }, a.fn.slick = function() {
                var a, c, d = this,
                    e = arguments[0],
                    f = Array.prototype.slice.call(arguments, 1),
                    g = d.length;
                for (a = 0; a < g; a++)
                    if ("object" == typeof e || void 0 === e ? d[a].slick = new b(d[a], e) : c = d[a].slick[e].apply(d[a].slick, f), void 0 !== c) return c;
                return d
            }
    }),
    function(a, b, c) {
        "use strict";
        ! function a(b, c, d) {
            function e(g, h) {
                if (!c[g]) {
                    if (!b[g]) {
                        var i = "function" == typeof require && require;
                        if (!h && i) return i(g, !0);
                        if (f) return f(g, !0);
                        var j = new Error("Cannot find module '" + g + "'");
                        throw j.code = "MODULE_NOT_FOUND", j
                    }
                    var k = c[g] = {
                        exports: {}
                    };
                    b[g][0].call(k.exports, function(a) {
                        var c = b[g][1][a];
                        return e(c || a)
                    }, k, k.exports, a, b, c, d)
                }
                return c[g].exports
            }
            for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
            return e
        }({
            1: [function(d, e, f) {
                function g(a) {
                    return a && a.__esModule ? a : {
                        default: a
                    }
                }
                Object.defineProperty(f, "__esModule", {
                    value: !0
                });
                var h, i, j, k, l = d("./modules/handle-dom"),
                    m = d("./modules/utils"),
                    n = d("./modules/handle-swal-dom"),
                    o = d("./modules/handle-click"),
                    p = d("./modules/handle-key"),
                    q = g(p),
                    r = d("./modules/default-params"),
                    s = g(r),
                    t = d("./modules/set-params"),
                    u = g(t);
                f.default = j = k = function() {
                    function d(a) {
                        var b = e;
                        return b[a] === c ? s.default[a] : b[a]
                    }
                    var e = arguments[0];
                    if ((0, l.addClass)(b.body, "stop-scrolling"), (0, n.resetInput)(), e === c) return (0, m.logStr)("SweetAlert expects at least 1 attribute!"), !1;
                    var f = (0, m.extend)({}, s.default);
                    switch (typeof e) {
                        case "string":
                            f.title = e, f.text = arguments[1] || "", f.type = arguments[2] || "";
                            break;
                        case "object":
                            if (e.title === c) return (0, m.logStr)('Missing "title" argument!'), !1;
                            f.title = e.title;
                            for (var g in s.default) f[g] = d(g);
                            f.confirmButtonText = f.showCancelButton ? "Confirm" : s.default.confirmButtonText, f.confirmButtonText = d("confirmButtonText"), f.doneFunction = arguments[1] || null;
                            break;
                        default:
                            return (0, m.logStr)('Unexpected type of argument! Expected "string" or "object", got ' + typeof e), !1
                    }(0, u.default)(f), (0, n.fixVerticalPosition)(), (0, n.openModal)(arguments[1]);
                    for (var j = (0, n.getModal)(), p = j.querySelectorAll("button"), r = ["onclick", "onmouseover", "onmouseout", "onmousedown", "onmouseup", "onfocus"], t = function(a) {
                            return (0, o.handleButton)(a, f, j)
                        }, v = 0; v < p.length; v++)
                        for (var w = 0; w < r.length; w++) {
                            var x = r[w];
                            p[v][x] = t
                        }(0, n.getOverlay)().onclick = t, h = a.onkeydown;
                    var y = function(a) {
                        return (0, q.default)(a, f, j)
                    };
                    a.onkeydown = y, a.onfocus = function() {
                        setTimeout(function() {
                            i !== c && (i.focus(), i = c)
                        }, 0)
                    }, k.enableButtons()
                }, j.setDefaults = k.setDefaults = function(a) {
                    if (!a) throw new Error("userParams is required");
                    if ("object" != typeof a) throw new Error("userParams has to be a object");
                    (0, m.extend)(s.default, a)
                }, j.close = k.close = function() {
                    var d = (0, n.getModal)();
                    (0, l.fadeOut)((0, n.getOverlay)(), 5), (0, l.fadeOut)(d, 5), (0, l.removeClass)(d, "showSweetAlert"), (0, l.addClass)(d, "hideSweetAlert"), (0, l.removeClass)(d, "visible");
                    var e = d.querySelector(".sa-icon.sa-success");
                    (0, l.removeClass)(e, "animate"), (0, l.removeClass)(e.querySelector(".sa-tip"), "animateSuccessTip"), (0, l.removeClass)(e.querySelector(".sa-long"), "animateSuccessLong");
                    var f = d.querySelector(".sa-icon.sa-error");
                    (0, l.removeClass)(f, "animateErrorIcon"), (0, l.removeClass)(f.querySelector(".sa-x-mark"), "animateXMark");
                    var g = d.querySelector(".sa-icon.sa-warning");
                    return (0, l.removeClass)(g, "pulseWarning"), (0, l.removeClass)(g.querySelector(".sa-body"), "pulseWarningIns"), (0, l.removeClass)(g.querySelector(".sa-dot"), "pulseWarningIns"), setTimeout(function() {
                        var a = d.getAttribute("data-custom-class");
                        (0, l.removeClass)(d, a)
                    }, 300), (0, l.removeClass)(b.body, "stop-scrolling"), a.onkeydown = h, a.previousActiveElement && a.previousActiveElement.focus(), i = c, clearTimeout(d.timeout), !0
                }, j.showInputError = k.showInputError = function(a) {
                    var b = (0, n.getModal)(),
                        c = b.querySelector(".sa-input-error");
                    (0, l.addClass)(c, "show");
                    var d = b.querySelector(".sa-error-container");
                    (0, l.addClass)(d, "show"), d.querySelector("p").innerHTML = a, setTimeout(function() {
                        j.enableButtons()
                    }, 1), b.querySelector("input").focus()
                }, j.resetInputError = k.resetInputError = function(a) {
                    if (a && 13 === a.keyCode) return !1;
                    var b = (0, n.getModal)(),
                        c = b.querySelector(".sa-input-error");
                    (0, l.removeClass)(c, "show");
                    var d = b.querySelector(".sa-error-container");
                    (0, l.removeClass)(d, "show")
                }, j.disableButtons = k.disableButtons = function(a) {
                    var b = (0, n.getModal)(),
                        c = b.querySelector("button.confirm"),
                        d = b.querySelector("button.cancel");
                    c.disabled = !0, d.disabled = !0
                }, j.enableButtons = k.enableButtons = function(a) {
                    var b = (0, n.getModal)(),
                        c = b.querySelector("button.confirm"),
                        d = b.querySelector("button.cancel");
                    c.disabled = !1, d.disabled = !1
                }, void 0 !== a ? a.sweetAlert = a.swal = j : (0, m.logStr)("SweetAlert is a frontend module!"), e.exports = f.default
            }, {
                "./modules/default-params": 2,
                "./modules/handle-click": 3,
                "./modules/handle-dom": 4,
                "./modules/handle-key": 5,
                "./modules/handle-swal-dom": 6,
                "./modules/set-params": 8,
                "./modules/utils": 9
            }],
            2: [function(a, b, c) {
                Object.defineProperty(c, "__esModule", {
                    value: !0
                });
                var d = {
                    title: "",
                    text: "",
                    type: null,
                    allowOutsideClick: !1,
                    showConfirmButton: !0,
                    showCancelButton: !1,
                    closeOnConfirm: !0,
                    closeOnCancel: !0,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#8CD4F5",
                    cancelButtonText: "Cancel",
                    imageUrl: null,
                    imageSize: null,
                    timer: null,
                    customClass: "",
                    html: !1,
                    animation: !0,
                    allowEscapeKey: !0,
                    inputType: "text",
                    inputPlaceholder: "",
                    inputValue: "",
                    showLoaderOnConfirm: !1
                };
                c.default = d, b.exports = c.default
            }, {}],
            3: [function(b, c, d) {
                Object.defineProperty(d, "__esModule", {
                    value: !0
                });
                var e = b("./utils"),
                    f = (b("./handle-swal-dom"), b("./handle-dom")),
                    g = function(b, c, d) {
                        function g(a) {
                            o && c.confirmButtonColor && (n.style.backgroundColor = a)
                        }
                        var j, k, l, m = b || a.event,
                            n = m.target || m.srcElement,
                            o = -1 !== n.className.indexOf("confirm"),
                            p = -1 !== n.className.indexOf("sweet-overlay"),
                            q = (0, f.hasClass)(d, "visible"),
                            r = c.doneFunction && "true" === d.getAttribute("data-has-done-function");
                        switch (o && c.confirmButtonColor && (j = c.confirmButtonColor, k = (0, e.colorLuminance)(j, -.04), l = (0, e.colorLuminance)(j, -.14)), m.type) {
                            case "mouseover":
                                g(k);
                                break;
                            case "mouseout":
                                g(j);
                                break;
                            case "mousedown":
                                g(l);
                                break;
                            case "mouseup":
                                g(k);
                                break;
                            case "focus":
                                var s = d.querySelector("button.confirm"),
                                    t = d.querySelector("button.cancel");
                                o ? t.style.boxShadow = "none" : s.style.boxShadow = "none";
                                break;
                            case "click":
                                var u = d === n,
                                    v = (0, f.isDescendant)(d, n);
                                if (!u && !v && q && !c.allowOutsideClick) break;
                                o && r && q ? h(d, c) : r && q || p ? i(d, c) : (0, f.isDescendant)(d, n) && "BUTTON" === n.tagName && sweetAlert.close()
                        }
                    },
                    h = function(a, b) {
                        var c = !0;
                        (0, f.hasClass)(a, "show-input") && ((c = a.querySelector("input").value) || (c = "")), b.doneFunction(c), b.closeOnConfirm && sweetAlert.close(), b.showLoaderOnConfirm && sweetAlert.disableButtons()
                    },
                    i = function(a, b) {
                        var c = String(b.doneFunction).replace(/\s/g, "");
                        "function(" === c.substring(0, 9) && ")" !== c.substring(9, 10) && b.doneFunction(!1), b.closeOnCancel && sweetAlert.close()
                    };
                d.default = {
                    handleButton: g,
                    handleConfirm: h,
                    handleCancel: i
                }, c.exports = d.default
            }, {
                "./handle-dom": 4,
                "./handle-swal-dom": 6,
                "./utils": 9
            }],
            4: [function(c, d, e) {
                Object.defineProperty(e, "__esModule", {
                    value: !0
                });
                var f = function(a, b) {
                        return new RegExp(" " + b + " ").test(" " + a.className + " ")
                    },
                    g = function(a, b) {
                        f(a, b) || (a.className += " " + b)
                    },
                    h = function(a, b) {
                        var c = " " + a.className.replace(/[\t\r\n]/g, " ") + " ";
                        if (f(a, b)) {
                            for (; c.indexOf(" " + b + " ") >= 0;) c = c.replace(" " + b + " ", " ");
                            a.className = c.replace(/^\s+|\s+$/g, "")
                        }
                    },
                    i = function(a) {
                        var c = b.createElement("div");
                        return c.appendChild(b.createTextNode(a)), c.innerHTML
                    },
                    j = function(a) {
                        a.style.opacity = "", a.style.display = "block"
                    },
                    k = function(a) {
                        if (a && !a.length) return j(a);
                        for (var b = 0; b < a.length; ++b) j(a[b])
                    },
                    l = function(a) {
                        a.style.opacity = "", a.style.display = "none"
                    },
                    m = function(a) {
                        if (a && !a.length) return l(a);
                        for (var b = 0; b < a.length; ++b) l(a[b])
                    },
                    n = function(a, b) {
                        for (var c = b.parentNode; null !== c;) {
                            if (c === a) return !0;
                            c = c.parentNode
                        }
                        return !1
                    },
                    o = function(a) {
                        a.style.left = "-9999px", a.style.display = "block";
                        var b, c = a.clientHeight;
                        return b = "undefined" != typeof getComputedStyle ? parseInt(getComputedStyle(a).getPropertyValue("padding-top"), 10) : parseInt(a.currentStyle.padding), a.style.left = "", a.style.display = "none", "-" + parseInt((c + b) / 2) + "px"
                    },
                    p = function(a, b) {
                        if (+a.style.opacity < 1) {
                            b = b || 16, a.style.opacity = 0, a.style.display = "block";
                            var c = +new Date;
                            ! function d() {
                                a.style.opacity = +a.style.opacity + (new Date - c) / 100, c = +new Date, +a.style.opacity < 1 && setTimeout(d, b)
                            }()
                        }
                        a.style.display = "block"
                    },
                    q = function(a, b) {
                        b = b || 16, a.style.opacity = 1;
                        var c = +new Date;
                        ! function d() {
                            a.style.opacity = +a.style.opacity - (new Date - c) / 100, c = +new Date, +a.style.opacity > 0 ? setTimeout(d, b) : a.style.display = "none"
                        }()
                    },
                    r = function(c) {
                        if ("function" == typeof MouseEvent) {
                            var d = new MouseEvent("click", {
                                view: a,
                                bubbles: !1,
                                cancelable: !0
                            });
                            c.dispatchEvent(d)
                        } else if (b.createEvent) {
                            var e = b.createEvent("MouseEvents");
                            e.initEvent("click", !1, !1), c.dispatchEvent(e)
                        } else b.createEventObject ? c.fireEvent("onclick") : "function" == typeof c.onclick && c.onclick()
                    },
                    s = function(b) {
                        "function" == typeof b.stopPropagation ? (b.stopPropagation(),
                            b.preventDefault()) : a.event && a.event.hasOwnProperty("cancelBubble") && (a.event.cancelBubble = !0)
                    };
                e.hasClass = f, e.addClass = g, e.removeClass = h, e.escapeHtml = i, e._show = j, e.show = k, e._hide = l, e.hide = m, e.isDescendant = n, e.getTopMargin = o, e.fadeIn = p, e.fadeOut = q, e.fireClick = r, e.stopEventPropagation = s
            }, {}],
            5: [function(b, d, e) {
                Object.defineProperty(e, "__esModule", {
                    value: !0
                });
                var f = b("./handle-dom"),
                    g = b("./handle-swal-dom"),
                    h = function(b, d, e) {
                        var h = b || a.event,
                            i = h.keyCode || h.which,
                            j = e.querySelector("button.confirm"),
                            k = e.querySelector("button.cancel"),
                            l = e.querySelectorAll("button[tabindex]");
                        if (-1 !== [9, 13, 32, 27].indexOf(i)) {
                            for (var m = h.target || h.srcElement, n = -1, o = 0; o < l.length; o++)
                                if (m === l[o]) {
                                    n = o;
                                    break
                                }
                            9 === i ? (m = -1 === n ? j : n === l.length - 1 ? l[0] : l[n + 1], (0, f.stopEventPropagation)(h), m.focus(), d.confirmButtonColor && (0, g.setFocusStyle)(m, d.confirmButtonColor)) : 13 === i ? ("INPUT" === m.tagName && (m = j, j.focus()), m = -1 === n ? j : c) : 27 === i && !0 === d.allowEscapeKey ? (m = k, (0, f.fireClick)(m, h)) : m = c
                        }
                    };
                e.default = h, d.exports = e.default
            }, {
                "./handle-dom": 4,
                "./handle-swal-dom": 6
            }],
            6: [function(c, d, e) {
                function f(a) {
                    return a && a.__esModule ? a : {
                        default: a
                    }
                }
                Object.defineProperty(e, "__esModule", {
                    value: !0
                });
                var g = c("./utils"),
                    h = c("./handle-dom"),
                    i = c("./default-params"),
                    j = f(i),
                    k = c("./injected-html"),
                    l = f(k),
                    m = function() {
                        var a = b.createElement("div");
                        for (a.innerHTML = l.default; a.firstChild;) b.body.appendChild(a.firstChild)
                    },
                    n = function a() {
                        var c = b.querySelector(".sweet-alert");
                        return c || (m(), c = a()), c
                    },
                    o = function() {
                        var a = n();
                        return a ? a.querySelector("input") : void 0
                    },
                    p = function() {
                        return b.querySelector(".sweet-overlay")
                    },
                    q = function(a, b) {
                        var c = (0, g.hexToRgb)(b);
                        a.style.boxShadow = "0 0 2px rgba(" + c + ", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"
                    },
                    r = function(c) {
                        var d = n();
                        (0, h.fadeIn)(p(), 10), (0, h.show)(d), (0, h.addClass)(d, "showSweetAlert"), (0, h.removeClass)(d, "hideSweetAlert"), a.previousActiveElement = b.activeElement, d.querySelector("button.confirm").focus(), setTimeout(function() {
                            (0, h.addClass)(d, "visible")
                        }, 500);
                        var e = d.getAttribute("data-timer");
                        if ("null" !== e && "" !== e) {
                            var f = c;
                            d.timeout = setTimeout(function() {
                                (f || null) && "true" === d.getAttribute("data-has-done-function") ? f(null) : sweetAlert.close()
                            }, e)
                        }
                    },
                    s = function() {
                        var a = n(),
                            b = o();
                        (0, h.removeClass)(a, "show-input"), b.value = j.default.inputValue, b.setAttribute("type", j.default.inputType), b.setAttribute("placeholder", j.default.inputPlaceholder), t()
                    },
                    t = function(a) {
                        if (a && 13 === a.keyCode) return !1;
                        var b = n(),
                            c = b.querySelector(".sa-input-error");
                        (0, h.removeClass)(c, "show");
                        var d = b.querySelector(".sa-error-container");
                        (0, h.removeClass)(d, "show")
                    },
                    u = function() {
                        n().style.marginTop = (0, h.getTopMargin)(n())
                    };
                e.sweetAlertInitialize = m, e.getModal = n, e.getOverlay = p, e.getInput = o, e.setFocusStyle = q, e.openModal = r, e.resetInput = s, e.resetInputError = t, e.fixVerticalPosition = u
            }, {
                "./default-params": 2,
                "./handle-dom": 4,
                "./injected-html": 7,
                "./utils": 9
            }],
            7: [function(a, b, c) {
                Object.defineProperty(c, "__esModule", {
                    value: !0
                });
                c.default = '<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>', b.exports = c.default
            }, {}],
            8: [function(a, b, d) {
                Object.defineProperty(d, "__esModule", {
                    value: !0
                });
                var e = a("./utils"),
                    f = a("./handle-swal-dom"),
                    g = a("./handle-dom"),
                    h = ["error", "warning", "info", "success", "input", "prompt"],
                    i = function(a) {
                        var b = (0, f.getModal)(),
                            d = b.querySelector("h2"),
                            i = b.querySelector("p"),
                            j = b.querySelector("button.cancel"),
                            k = b.querySelector("button.confirm");
                        if (d.innerHTML = a.html ? a.title : (0, g.escapeHtml)(a.title).split("\n").join("<br>"), i.innerHTML = a.html ? a.text : (0, g.escapeHtml)(a.text || "").split("\n").join("<br>"), a.text && (0, g.show)(i), a.customClass)(0, g.addClass)(b, a.customClass), b.setAttribute("data-custom-class", a.customClass);
                        else {
                            var l = b.getAttribute("data-custom-class");
                            (0, g.removeClass)(b, l), b.setAttribute("data-custom-class", "")
                        }
                        if ((0, g.hide)(b.querySelectorAll(".sa-icon")), a.type && !(0, e.isIE8)()) {
                            var m = function() {
                                for (var d = !1, e = 0; e < h.length; e++)
                                    if (a.type === h[e]) {
                                        d = !0;
                                        break
                                    }
                                if (!d) return logStr("Unknown alert type: " + a.type), {
                                    v: !1
                                };
                                var i = ["success", "error", "warning", "info"],
                                    j = c; - 1 !== i.indexOf(a.type) && (j = b.querySelector(".sa-icon.sa-" + a.type), (0, g.show)(j));
                                var k = (0, f.getInput)();
                                switch (a.type) {
                                    case "success":
                                        (0, g.addClass)(j, "animate"), (0, g.addClass)(j.querySelector(".sa-tip"), "animateSuccessTip"), (0, g.addClass)(j.querySelector(".sa-long"), "animateSuccessLong");
                                        break;
                                    case "error":
                                        (0, g.addClass)(j, "animateErrorIcon"), (0, g.addClass)(j.querySelector(".sa-x-mark"), "animateXMark");
                                        break;
                                    case "warning":
                                        (0, g.addClass)(j, "pulseWarning"), (0, g.addClass)(j.querySelector(".sa-body"), "pulseWarningIns"), (0, g.addClass)(j.querySelector(".sa-dot"), "pulseWarningIns");
                                        break;
                                    case "input":
                                    case "prompt":
                                        k.setAttribute("type", a.inputType), k.value = a.inputValue, k.setAttribute("placeholder", a.inputPlaceholder), (0, g.addClass)(b, "show-input"), setTimeout(function() {
                                            k.focus(), k.addEventListener("keyup", swal.resetInputError)
                                        }, 400)
                                }
                            }();
                            if ("object" == typeof m) return m.v
                        }
                        if (a.imageUrl) {
                            var n = b.querySelector(".sa-icon.sa-custom");
                            n.style.backgroundImage = "url(" + a.imageUrl + ")", (0, g.show)(n);
                            var o = 80,
                                p = 80;
                            if (a.imageSize) {
                                var q = a.imageSize.toString().split("x"),
                                    r = q[0],
                                    s = q[1];
                                r && s ? (o = r, p = s) : logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got " + a.imageSize)
                            }
                            n.setAttribute("style", n.getAttribute("style") + "width:" + o + "px; height:" + p + "px")
                        }
                        b.setAttribute("data-has-cancel-button", a.showCancelButton), a.showCancelButton ? j.style.display = "inline-block" : (0, g.hide)(j), b.setAttribute("data-has-confirm-button", a.showConfirmButton), a.showConfirmButton ? k.style.display = "inline-block" : (0, g.hide)(k), a.cancelButtonText && (j.innerHTML = (0, g.escapeHtml)(a.cancelButtonText)), a.confirmButtonText && (k.innerHTML = (0, g.escapeHtml)(a.confirmButtonText)), a.confirmButtonColor && (k.style.backgroundColor = a.confirmButtonColor, k.style.borderLeftColor = a.confirmLoadingButtonColor, k.style.borderRightColor = a.confirmLoadingButtonColor, (0, f.setFocusStyle)(k, a.confirmButtonColor)), b.setAttribute("data-allow-outside-click", a.allowOutsideClick);
                        var t = !!a.doneFunction;
                        b.setAttribute("data-has-done-function", t), a.animation ? "string" == typeof a.animation ? b.setAttribute("data-animation", a.animation) : b.setAttribute("data-animation", "pop") : b.setAttribute("data-animation", "none"), b.setAttribute("data-timer", a.timer)
                    };
                d.default = i, b.exports = d.default
            }, {
                "./handle-dom": 4,
                "./handle-swal-dom": 6,
                "./utils": 9
            }],
            9: [function(b, c, d) {
                Object.defineProperty(d, "__esModule", {
                    value: !0
                });
                var e = function(a, b) {
                        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                        return a
                    },
                    f = function(a) {
                        var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
                        return b ? parseInt(b[1], 16) + ", " + parseInt(b[2], 16) + ", " + parseInt(b[3], 16) : null
                    },
                    g = function() {
                        return a.attachEvent && !a.addEventListener
                    },
                    h = function(b) {
                        void 0 !== a && a.console && a.console.log("SweetAlert: " + b)
                    },
                    i = function(a, b) {
                        a = String(a).replace(/[^0-9a-f]/gi, ""), a.length < 6 && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]), b = b || 0;
                        var c, d, e = "#";
                        for (d = 0; 3 > d; d++) c = parseInt(a.substr(2 * d, 2), 16), c = Math.round(Math.min(Math.max(0, c + c * b), 255)).toString(16), e += ("00" + c).substr(c.length);
                        return e
                    };
                d.extend = e, d.hexToRgb = f, d.isIE8 = g, d.logStr = h, d.colorLuminance = i
            }, {}]
        }, {}, [1]), "function" == typeof define && define.amd ? define(function() {
            return sweetAlert
        }) : "undefined" != typeof module && module.exports && (module.exports = sweetAlert)
    }(window, document);
