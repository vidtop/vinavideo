TinyCore.Module.define('models_vidtop', [], function () {
    var _cache = lru(100);
    _cache.set('2PACX-1vTY4MCWeJSzJpSGNNvEfiXXRJRIenK0Sj6UWSdQrcN-dWcDS_gUZYvn1A_4E4jnSxqllMH9PMQn6IDt', [{"status":1,"name":"i","value":"2PACX-1vRaricznSmI7vlvBm1uyyaGUHId8zbTH8d14UCx6amteStG84GShytjL8CFfriZzCDcstYp5wsysK7y"},{"status":1,"name":"menu","value":"{\n    \"logo\": {\n        \"img\": \"https://rawgit.com/vidtop/vinavideo/master/vinavideo_38.png\",\n        \"name\": \"VinaVideo\",\n        \"link\": \"#\"\n    },\n    \"menus\": [\n         {\n            \"name\": \"Video\",\n            \"link\": \"#i/video\",\n            \"childs\": [\n                {\n                    \"name\": \"Ý Nghĩa\",\n                    \"link\": \"#c/video-hay\"\n                },\n                {\n                    \"name\": \"Ẩm Thực\",\n                    \"link\": \"#c/video-cuisine\"\n                },\n                {\n                    \"name\": \"Tài Chính\",\n                    \"link\": \"#c/video-financial\"\n                },\n                {\n                    \"name\": \"Âm Nhạc\",\n                    \"link\": \"#c/video-music\"\n                }\n\n            ]\n        },\n        {\n            \"name\": \"Mommy\",\n            \"link\": \"#i/mommy\",\n            \"childs\": [\n                {\n                    \"name\": \"Tiền Sản\",\n                    \"link\": \"#c/mommy-tiensan\"\n                },\n                {\n                    \"name\": \"Sơ Sinh\",\n                    \"link\": \"#c/mommy-sosinh\"\n                },\n                {\n                    \"name\": \"Dinh Dưỡng\",\n                    \"link\": \"#c/mommy-dinhduong\"\n                },\n                {\n                    \"name\": \"Món Ngon Cho Bé\",\n                    \"link\": \"#c/mommy-monan\"\n                }\n\n            ]\n        },\n        {\n            \"name\": \"Movies\",\n            \"link\": \"#i/movies\",\n            \"childs\": [\n                {\n                    \"name\": \"Action\",\n                    \"link\": \"#c/movies-action\"\n                },\n                {\n                    \"name\": \"Adventure\",\n                    \"link\": \"#c/movies-adventure\"\n                },\n                {\n                    \"name\": \"Animation\",\n                    \"link\": \"#c/movies-animation\"\n                },\n                {\n                    \"name\": \"Comedy\",\n                    \"link\": \"#c/movies-comedy\"\n                },\n                {\n                    \"name\": \"Horror\",\n                    \"link\": \"#c/movies-horror\"\n                },\n                {\n                    \"name\": \"Romance\",\n                    \"link\": \"#c/movies-romance\"\n                }\n            ]\n        }\n    ]\n}\n"},{"status":1,"name":"player","value":"2PACX-1vRVzDghMrAMEqAlBsATTPz0HudfkFaILjS803usGRhKKlARTQnWW5mLAdzDxQ8vWNXKE9CEXXt2rDwu.1"},{"status":1,"name":"i|courses","value":"2PACX-1vRIOAAz7WfqD97s5srFc2ZBIEEDzOgLWw7UdfID-RjqTndcbRLWwC1HBrbrYTr34Tr7bPztb-4LPiBp"},{"status":1,"name":"c|courses-programming","value":"2PACX-1vS6_oWlbAG-AQ5IM92w-aGhn3-WKUhLs66bdwIl_7F5jTJuPf2ymjMOmuwuq_AgnnlO8wy1fJEQJaOg"},{"status":1,"name":"i|movies","value":"2PACX-1vR9TyYhPsZ_uJYCghS2YCegrgUC2XZVx1V4DQ4lbGffBt6wZ3205mpmHniJVucY8i8D0weP99FZ-vk-"},{"status":1,"name":"c|movies-action","value":"2PACX-1vQ7NXscd3lKnifuGmz7mwwQTlrzgh6zS9oIoN8svjpiBZvHY6KH5qTVZ4D-hhkFya_DJeIZPPrhxbOe"},{"status":1,"name":"c|movies-adventure","value":"2PACX-1vQNpH1ljaEIc7tFnj96MqyefucWwfHxvIr2jfchz_rBxtbJDtYDhpLOIgqnM7PvPJ_PuZzxdcMLQcjq"},{"status":1,"name":"c|movies-animation","value":"2PACX-1vTTcebVoSiJnaH4il2o_NPYyYLDDTGEehWCxHGpUU6UX-LSvNEzdvGQT9AU0aoRXR4GLpBoFzSv5Tbz"},{"status":1,"name":"c|movies-comedy","value":"2PACX-1vRS4GG1fKv3XpNupS754VzF6zK02xlpozA7DwfSZAaAco749vwI5rVaWCiSLUM8lQAC3fJjknj-xDmG"},{"status":1,"name":"c|movies-horror","value":"2PACX-1vQ2-rChZqpkogyzUzCVFJe02p5-Z1oZkhkUvi2lscN5NcS1bnPye_zqYEtF52kf7HyG59Eqi4cxgFJp"},{"status":1,"name":"c|movies-romance","value":"2PACX-1vRnuNaLIyR4CSZybn91z7pkIs0HFHr7s5t9fh-TGQaoCsNdhd2R0e1RBGOf6ly0KO8DpgJW7F-Ui2Da"},{"status":1,"name":"c|movies-romance*1","value":"2PACX-1vRnuNaLIyR4CSZybn91z7pkIs0HFHr7s5t9fh-TGQaoCsNdhd2R0e1RBGOf6ly0KO8DpgJW7F-Ui2Da"},{"status":1,"name":"i|video","value":"2PACX-1vS3yB3nRflmMbMuGjhHzPwihDYOb7E7-3dqACj6KkEt6GjEhQuJAT3JERUmjJ6Vs_IlRvJ-YljlFrKX"},{"status":1,"name":"c|video-hay","value":"2PACX-1vS1DIIinL5lRZQUXn52g8YXWCk7VkI65pVES8JnKDdbWFq2MJwNjGT5TuEI3gcJ-f3BXVC-myNZjW3q"},{"status":1,"name":"c|video-giaitri","value":"2PACX-1vQ0zCv4zK6DesZDbdBpAXujqDCCI2IxKsxcdmO3S_J9ukYS87whj0_cq2PMmWyQZsTibbZp9Ky3efFy"},{"status":1,"name":"c|video-financial","value":"2PACX-1vTH_6Ekd9D_7pAftHkD7xMc5m-ZXSqDkW23AuD-BWwXB3yOqE2BC0MELayixVc5bCD9IiAdTwDdywBo"},{"status":1,"name":"c|video-cuisine","value":"2PACX-1vRcG-ZE71W0Bw20nzwfpZUkzJVMlCbbgDLlvThVHWs7PAJTwkutu0xdtq_JLV1LCADpjJCzFvE_7w3l"},{"status":1,"name":"c|video-cuisine*1","value":"2PACX-1vTt_wLbQLUiJPTcOGjNEdBAATGUXh8NBmu2DHfIKdPuL4C7KGsG-nN6aYHNniIuGPiMaPV6Ut_dDJ0H"},{"status":1,"name":"c|video-cuisine*2","value":"2PACX-1vSRzbYQ-epl_QYadbqx5SZNzePE5va4SZlP95COHAQSlJ_dS_c1qKmzHkdjqubfVQTZk5uyrxzb_TGl"},{"status":1,"name":"c|video-cuisine*3","value":"2PACX-1vQhFknVQhj4KQc2cf2pwys12iFle86NiK9syhZGVbstpSDpgGYhjzs-uPks44vR-oLCOz38MK2xoIkj"},{"status":1,"name":"c|video-cuisine*4","value":"2PACX-1vQzuneT2XrGtKSDHbcVi-kgxlMXA6QCiumVFPGfFKswraKZZigB5NOVUu9Ff7N4XnzxbTBQp9KQiWaM"},{"status":1,"name":"c|video-sports","value":"2PACX-1vQCj1aVsRz6JM7QfSFQa4r23jtolVrV9m9pI6hRm_o_cIOYN_BlB1j_sz9YBERdIUX2qBjTbDd0pgMZ"},{"status":1,"name":"c|video-news","value":"2PACX-1vRNMbyovg0ba633bya5G-iMDsCOfKsntNmNoVl83YmUXRX2p8gFKl-UXcrjsnhZ4wnPbN9fc9lKQHTN"},{"status":1,"name":"c|video-news*1","value":"2PACX-1vQy_Fi50SBjNpwOKE6wC2nqHAQ8IT3ZTXPz-0Zyy06pEpeJigLqy3RxiHXG0KICBlapzmy66NeX-3As"},{"status":1,"name":"i|mommy","value":"2PACX-1vQl8395BgV9hLJp5PjSIXsS4IzxxI8v_QDln8RJdioFS6UkLenl1WDynOkZhoZPHPhskxQjIXBp5Lm0"},{"status":1,"name":"c|mommy-sosinh","value":"2PACX-1vQ5cF-8T7ovaaitVRP6PhVBTTUJSLOmj_hvXWoOFXDRE0xSOLgphaj5k7OwfXADvUnOU0S_U3PD_1qd"},{"status":1,"name":"c|mommy-sosinh*1","value":"2PACX-1vRusYtzgnElrOJIyOaPM-zE2EE-WAo8nQ6oa8Bfvu7KpWQgGsRpYgaGK4Iv2Cl1WCH0qRAQiKqnnptQ"},{"status":1,"name":"c|mommy-sosinh*2","value":"2PACX-1vTPc9fXXZ4exIITh-S4vz29NGQBZUZptpaY3zyssaG9VIe_SowLNDhLscytCEn7q5XtL2uASTZIMsL1"},{"status":1,"name":"c|mommy-sosinh*3","value":"2PACX-1vTNzQJ6a5JcKi-XTq6r-tkyCwKnsiztFmzVSTP78VIzqbVXkEfbH94cd9X610EWwlhY6AulkiW3pex7"},{"status":1,"name":"c|mommy-sosinh*4","value":"2PACX-1vQXW6lpVvxchI5fqByUHZYFvJ43meTP3iri3f9e2lUiqYM6GbjdawLEuy4IYaxkvNJhvRRWURf5Zvpp"},{"status":1,"name":"c|mommy-dinhduong","value":"2PACX-1vQIBSTJu2D23oi2HtbFaALwcz5bzdJWu8Lhkab_oa2lghx8LG0NDSpWb8ekqy2e8hDGynXRZXJbKF-a"},{"status":1,"name":"c|mommy-monan","value":"2PACX-1vRbj0fCMdqSMEDFou-io-iASHJVwvqtk2fZKwgafahoS5mZtd5-MjTJCv5faNsyhHgoIvdd07TZbExV"},{"status":1,"name":"c|mommy-monan*1","value":"2PACX-1vT1h7jWcncV3-k6PFMUBcp7nRDMSbkfEDR4yD8F_7MfaO5zMMofvwXI7YHuotWnw-7ebra_NJ2cx4Ro"},{"status":1,"name":"c|mommy-tiensan","value":"2PACX-1vQOoPSlDh_yJR1Fb8dAJeaHFW5g2Iu1fQng4o96qR3TJuIzG5TgGP5ii4YY4YcXH7exm0-BwwTTA5kV"},{"status":1,"name":"c|mommy-tiensan*1","value":"2PACX-1vRK0N_Bwc8vyM2TuhR6iFd7FzZXuKjK-oFaez4nlJjWIWuBmZPzdz6B2ihWk-KW6W-0D17EZg2wXpkJ"}]);
var _config = (function () {/*
status,name,value
1,i,2PACX-1vRaricznSmI7vlvBm1uyyaGUHId8zbTH8d14UCx6amteStG84GShytjL8CFfriZzCDcstYp5wsysK7y
1,menu,"{
    ""logo"": {
        ""img"": ""https://rawgit.com/vidtop/vinavideo/master/vinavideo_38.png"",
        ""name"": ""VinaVideo"",
        ""link"": ""#""
    },
    ""menus"": [
         {
            ""name"": ""Video"",
            ""link"": ""#i/video"",
            ""childs"": [
                {
                    ""name"": ""Ã NghÄ©a"",
                    ""link"": ""#c/video-hay""
                },
                {
                    ""name"": ""áº¨m Thá»±c"",
                    ""link"": ""#c/video-cuisine""
                },
                {
                    ""name"": ""TÃ i ChÃ­nh"",
                    ""link"": ""#c/video-financial""
                },
                {
                    ""name"": ""Ã‚m Nháº¡c"",
                    ""link"": ""#c/video-music""
                }

            ]
        },
        {
            ""name"": ""Mommy"",
            ""link"": ""#i/mommy"",
            ""childs"": [
                {
                    ""name"": ""Tiá»n Sáº£n"",
                    ""link"": ""#c/mommy-tiensan""
                },
                {
                    ""name"": ""SÆ¡ Sinh"",
                    ""link"": ""#c/mommy-sosinh""
                },
                {
                    ""name"": ""Dinh DÆ°á»¡ng"",
                    ""link"": ""#c/mommy-dinhduong""
                },
                {
                    ""name"": ""MÃ³n Ngon Cho BÃ©"",
                    ""link"": ""#c/mommy-monan""
                }

            ]
        },
        {
            ""name"": ""Movies"",
            ""link"": ""#i/movies"",
            ""childs"": [
                {
                    ""name"": ""Action"",
                    ""link"": ""#c/movies-action""
                },
                {
                    ""name"": ""Adventure"",
                    ""link"": ""#c/movies-adventure""
                },
                {
                    ""name"": ""Animation"",
                    ""link"": ""#c/movies-animation""
                },
                {
                    ""name"": ""Comedy"",
                    ""link"": ""#c/movies-comedy""
                },
                {
                    ""name"": ""Horror"",
                    ""link"": ""#c/movies-horror""
                },
                {
                    ""name"": ""Romance"",
                    ""link"": ""#c/movies-romance""
                }
            ]
        }
    ]
}
"
1,player,2PACX-1vRVzDghMrAMEqAlBsATTPz0HudfkFaILjS803usGRhKKlARTQnWW5mLAdzDxQ8vWNXKE9CEXXt2rDwu.1
1,i|courses,2PACX-1vRIOAAz7WfqD97s5srFc2ZBIEEDzOgLWw7UdfID-RjqTndcbRLWwC1HBrbrYTr34Tr7bPztb-4LPiBp
1,c|courses-programming,2PACX-1vS6_oWlbAG-AQ5IM92w-aGhn3-WKUhLs66bdwIl_7F5jTJuPf2ymjMOmuwuq_AgnnlO8wy1fJEQJaOg
1,i|movies,2PACX-1vR9TyYhPsZ_uJYCghS2YCegrgUC2XZVx1V4DQ4lbGffBt6wZ3205mpmHniJVucY8i8D0weP99FZ-vk-
1,c|movies-action,2PACX-1vQ7NXscd3lKnifuGmz7mwwQTlrzgh6zS9oIoN8svjpiBZvHY6KH5qTVZ4D-hhkFya_DJeIZPPrhxbOe
1,c|movies-adventure,2PACX-1vQNpH1ljaEIc7tFnj96MqyefucWwfHxvIr2jfchz_rBxtbJDtYDhpLOIgqnM7PvPJ_PuZzxdcMLQcjq
1,c|movies-animation,2PACX-1vTTcebVoSiJnaH4il2o_NPYyYLDDTGEehWCxHGpUU6UX-LSvNEzdvGQT9AU0aoRXR4GLpBoFzSv5Tbz
1,c|movies-comedy,2PACX-1vRS4GG1fKv3XpNupS754VzF6zK02xlpozA7DwfSZAaAco749vwI5rVaWCiSLUM8lQAC3fJjknj-xDmG
1,c|movies-horror,2PACX-1vQ2-rChZqpkogyzUzCVFJe02p5-Z1oZkhkUvi2lscN5NcS1bnPye_zqYEtF52kf7HyG59Eqi4cxgFJp
1,c|movies-romance,2PACX-1vRnuNaLIyR4CSZybn91z7pkIs0HFHr7s5t9fh-TGQaoCsNdhd2R0e1RBGOf6ly0KO8DpgJW7F-Ui2Da
1,c|movies-romance*1,2PACX-1vRnuNaLIyR4CSZybn91z7pkIs0HFHr7s5t9fh-TGQaoCsNdhd2R0e1RBGOf6ly0KO8DpgJW7F-Ui2Da
1,i|video,2PACX-1vS3yB3nRflmMbMuGjhHzPwihDYOb7E7-3dqACj6KkEt6GjEhQuJAT3JERUmjJ6Vs_IlRvJ-YljlFrKX
1,c|video-hay,2PACX-1vS1DIIinL5lRZQUXn52g8YXWCk7VkI65pVES8JnKDdbWFq2MJwNjGT5TuEI3gcJ-f3BXVC-myNZjW3q
1,c|video-giaitri,2PACX-1vQ0zCv4zK6DesZDbdBpAXujqDCCI2IxKsxcdmO3S_J9ukYS87whj0_cq2PMmWyQZsTibbZp9Ky3efFy
1,c|video-financial,2PACX-1vTH_6Ekd9D_7pAftHkD7xMc5m-ZXSqDkW23AuD-BWwXB3yOqE2BC0MELayixVc5bCD9IiAdTwDdywBo
1,c|video-cuisine,2PACX-1vRcG-ZE71W0Bw20nzwfpZUkzJVMlCbbgDLlvThVHWs7PAJTwkutu0xdtq_JLV1LCADpjJCzFvE_7w3l
1,c|video-cuisine*1,2PACX-1vTt_wLbQLUiJPTcOGjNEdBAATGUXh8NBmu2DHfIKdPuL4C7KGsG-nN6aYHNniIuGPiMaPV6Ut_dDJ0H
1,c|video-cuisine*2,2PACX-1vSRzbYQ-epl_QYadbqx5SZNzePE5va4SZlP95COHAQSlJ_dS_c1qKmzHkdjqubfVQTZk5uyrxzb_TGl
1,c|video-cuisine*3,2PACX-1vQhFknVQhj4KQc2cf2pwys12iFle86NiK9syhZGVbstpSDpgGYhjzs-uPks44vR-oLCOz38MK2xoIkj
1,c|video-cuisine*4,2PACX-1vQzuneT2XrGtKSDHbcVi-kgxlMXA6QCiumVFPGfFKswraKZZigB5NOVUu9Ff7N4XnzxbTBQp9KQiWaM
1,c|video-sports,2PACX-1vQCj1aVsRz6JM7QfSFQa4r23jtolVrV9m9pI6hRm_o_cIOYN_BlB1j_sz9YBERdIUX2qBjTbDd0pgMZ
1,c|video-news,2PACX-1vRNMbyovg0ba633bya5G-iMDsCOfKsntNmNoVl83YmUXRX2p8gFKl-UXcrjsnhZ4wnPbN9fc9lKQHTN
1,c|video-news*1,2PACX-1vQy_Fi50SBjNpwOKE6wC2nqHAQ8IT3ZTXPz-0Zyy06pEpeJigLqy3RxiHXG0KICBlapzmy66NeX-3As
1,i|mommy,2PACX-1vQl8395BgV9hLJp5PjSIXsS4IzxxI8v_QDln8RJdioFS6UkLenl1WDynOkZhoZPHPhskxQjIXBp5Lm0
1,c|mommy-sosinh,2PACX-1vQ5cF-8T7ovaaitVRP6PhVBTTUJSLOmj_hvXWoOFXDRE0xSOLgphaj5k7OwfXADvUnOU0S_U3PD_1qd
1,c|mommy-sosinh*1,2PACX-1vRusYtzgnElrOJIyOaPM-zE2EE-WAo8nQ6oa8Bfvu7KpWQgGsRpYgaGK4Iv2Cl1WCH0qRAQiKqnnptQ
1,c|mommy-sosinh*2,2PACX-1vTPc9fXXZ4exIITh-S4vz29NGQBZUZptpaY3zyssaG9VIe_SowLNDhLscytCEn7q5XtL2uASTZIMsL1
1,c|mommy-sosinh*3,2PACX-1vTNzQJ6a5JcKi-XTq6r-tkyCwKnsiztFmzVSTP78VIzqbVXkEfbH94cd9X610EWwlhY6AulkiW3pex7
1,c|mommy-sosinh*4,2PACX-1vQXW6lpVvxchI5fqByUHZYFvJ43meTP3iri3f9e2lUiqYM6GbjdawLEuy4IYaxkvNJhvRRWURf5Zvpp
1,c|mommy-dinhduong,2PACX-1vQIBSTJu2D23oi2HtbFaALwcz5bzdJWu8Lhkab_oa2lghx8LG0NDSpWb8ekqy2e8hDGynXRZXJbKF-a
1,c|mommy-monan,2PACX-1vRbj0fCMdqSMEDFou-io-iASHJVwvqtk2fZKwgafahoS5mZtd5-MjTJCv5faNsyhHgoIvdd07TZbExV
1,c|mommy-monan*1,2PACX-1vT1h7jWcncV3-k6PFMUBcp7nRDMSbkfEDR4yD8F_7MfaO5zMMofvwXI7YHuotWnw-7ebra_NJ2cx4Ro
1,c|mommy-tiensan,2PACX-1vQOoPSlDh_yJR1Fb8dAJeaHFW5g2Iu1fQng4o96qR3TJuIzG5TgGP5ii4YY4YcXH7exm0-BwwTTA5kV
1,c|mommy-tiensan*1,2PACX-1vRK0N_Bwc8vyM2TuhR6iFd7FzZXuKjK-oFaez4nlJjWIWuBmZPzdz6B2ihWk-KW6W-0D17EZg2wXpkJ
                            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
    console.log(_config);
    return {
        onStart: function (params) {

        },
        getDataItem: function (key, _t111) {
            var _gd_key_id = key + '.' + _t111.id;
            _t111.post = {ID: _gd_key_id};
            _t111.href = '#p/' + _gd_key_id;
            _t111.link = '#p/' + _gd_key_id;
            _t111.content = _t111.text;
            _t111.post_id = _gd_key_id;
            return _t111;
        },
        getDataList: function (key, callback) {
            var that = this;
            that.getData(key, function (_e3) {
                callback(
                    _e3.filter(function (_e) {
                        return _e;
                    }).map(function (_e) {
                        return that.getDataItem(key, _e)
                    })
                )
            })
        },
        getPlayObj: function (_gd_key, _cb) {
            var that = this;

            that.getData(_gd_key, function (_e2_) {
                that.getDataPlayDetail(_e2_, _cb);
            })
        },
        getDataPlayDetail: function (_e2, callback) {
            var that = this;

            function _handlePlayer(_e2, _e3_, _cb) {
                var _e3 = _e3_.constructor === Array ? _e3_[0] : _e3_;

                // var _vcode = _e2.src_play;
                Object.assign(_e3.meta, {
                    title: _e2.title,
                    subTitle: _e2.subTitle
                });
                _e3.preview = {
                    "previewSeconds": "0",
                    "previewLink": "",
                    "previewTitle": "",
                    "previewDescription": ""
                }
                // if (_e2.src_type == 'youtube') {
                //     Object.assign(_e3, {
                //         codes: ['https://www.youtube.com/watch?v=' + _vcode],
                //         poster: 'https://img.youtube.com/vi/' + _vcode + '/maxresdefault.jpg'
                //     })
                // }
                _e3.options.type = _e2.src_type;
                _e3.options.code = _e2.src_play;
                _cb(_e3);

            }

            if (!_e2.player) {
                _e2.player = vidtop.config.player;
            }
            that.getData(_e2.player, function (_e3_) {
                _handlePlayer(_e2, _e3_, callback);
            })
        },

        _getDataHandler: function (_res, key, _id, callback) {
            var _tmp = _res.filter(function (_e) {
                return _e.status
            });
            var _val;
            if (_id)
                _val = _tmp.filter(function (_e) {
                    return _e.id == _id
                })[0];
            else
                _val = _tmp;

            callback(_val);
        },
        getData: function (key, callback) {
            var that = this;
            var _id, key1;
            
            if (/\./.test(key)) {
                var _keyr = key.split('.');
                _id = _keyr[1];
                key1 = _keyr[0]
            } else {
                key1 = key;
            }
            var _url = 'https://docs.google.com/spreadsheets/d/e/' + key1 + '/pub?output=csv';
            var _cc = _cache.get(key1);
            if (_cc) {
                if (vidtop.config && vidtop.config.player && key1 == vidtop.config.player)
                    that._getDataHandler(JSON.parse(_cc), key, _id, callback);
                else that._getDataHandler(_cc, key, _id, callback);
            } else
               
                that._api(_url, function (_val) {
                    console.log(JSON.stringify(_val));
                    if (vidtop.config && vidtop.config.player && key1 == vidtop.config.player)
                        _cache.set(key1, JSON.stringify(_val));
                    else _cache.set(key1, _val);
                    that._getDataHandler(_val, key, _id, callback);
                });
        },

        _csvJSON: function csvJSON(lines) {

            var result = [];
            var headers = lines[0];
            for (var i = 1; i < lines.length; i++) {
                var obj = {};
                var currentline = lines[i];
                var currentlinei;
                for (var j = 0; j < headers.length; j++) {
                    currentlinei = currentline[j];
                    objectPath.set(obj, headers[j], currentlinei);
                }
                result.push(obj);
            }
            return result;
        },
        _api: function (input, callback) {
            var self = this;
            
           
            var config = buildConfig();
            var start = now();
            var end;
            Papa.parse(input, config);

            function printStats(msg) {
                if (msg)
                    console.log(msg);
                console.log("       Time:", (end - start || "(Unknown; your browser does not support the Performance API)"), "ms");

            }

            function buildConfig() {
                return {
                    delimiter: "",	// auto-detect
                    newline: "",	// auto-detect
                    quoteChar: '"',
                    header: false,
                    dynamicTyping: true,
                    preview: 0,
                    encoding: "",
                    worker: false,
                    comments: false,
                    skipEmptyLines: false,
                    chunk: undefined,
                    fastMode: undefined,
                    beforeFirstChunk: undefined,
                    withCredentials: undefined,
                    step: undefined,
                    complete: completeFn,
                    error: errorFn,
                    download: true
                };
            }


            function completeFn(results) {
                end = now();
                printStats("Parse complete");
                var json_results = self._csvJSON(results.data);
                callback(json_results);
            }

            function errorFn(err, file) {
                end = now();
                console.log("ERROR:", err, file);
            }


            function now() {
                return typeof window.performance !== 'undefined' ?
                    window.performance.now() :
                    0;
            }
        }
    }
})
