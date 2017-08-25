_define('layout', [window, 'util', 'bringe'], function (window, util, bringe) {

    var iconMap = {
        facebook: "fa-facebook-square",
        twitter: "fa-twitter-square",
        google: "fa-google-plus-square",
        instagram: "fa-instagram",
        snapchat: "fa-snapchat-square",
        youtube: "fa-youtube-square",
        tumblr: "fa-tumblr-square"
    };
    var globalDivs = {
        trendingMovieObj: $('<div class="trending-movie-box"> <div class="tr-movie-img"> <img> </div>' +
            '<div class="tr-bottom"> <div class="tr-details"><div class="tr-name"></div></div> </div> <div class="tr-rate-box">' +
            '<div class="tr-rate"></div><i class="fa fa-heart" aria-hidden="true"></i> </div> </div>'),
        searchMovieDivObj: $('<div class="searchMovie">' +
            '<div class="searchMovieImage"> <img> </div>' +
            '<div class="searchMovieDetail"> <div class="searchMovieName"></div> <div class="searchMovieSubline"></div> </div> ' +
            '<div class="searchMovieRating">' +
            '<div class="searchMovieRatingValue"></div> <i class="fa fa-heart" aria-hidden="true"></i> </div> </div>'),
        searchSerieDivObj: $('<div class="searchSerie">' +
            '<div class="searchSerieImage"> <img> </div>' +
            '<div class="searchSerieDetail"> <div class="searchSerieName"></div> <div class="searchSerieYear"></div> </div> ' +
            '<div class="searchSerieRating">' +
            '<div class="searchSerieRatingValue"></div> <i class="fa fa-heart" aria-hidden="true"></i> </div> </div>'),
        seasonListDivObj: $('<div class="seasonListDiv">' +
            '<div class="seasonListImage"> <img> </div>' +
            '<div class="seasonListDetail">' +
            '<div class="seasonListName"></div> <div class="seasonListConsensus"></div> <div class="seasonListInfo"></div> </div> ' +
            '<div class="seasonListRating">' +
            '<div class="seasonListRatingValue"></div> <i class="fa fa-heart" aria-hidden="true"></i> </div> </div>'),
        episodeListDivObj: $('<div class="episodeListDiv">' +
            '<div class="episodeListLeft">' +
            '<div class="episodeListNumber"></div>' +
            '<div class="episodeListDate"></div></div>' +
            '<div class="episodeListDetail">' +
            '<div class="episodeListName"></div> <div class="episodeListSynopsis"></div> </div> ' +
            '<div class="episodeListRating">' +
            '<div class="episodeListRatingValue"></div> <i class="fa fa-heart" aria-hidden="true"></i> </div> </div>'),
        castMemberDivObj: $('<div class="col-lg-3 col-md-4 col-sm-6"><div class="cast-member"><div class="row">' +
            '<div class="cast-image"> <img></div><div class="cast-details">' +
            '<div class="cast-name"></div> <div class="cast-role"></div></div></div> </div></div>'),
        watchItemDivObj: $('<div class="watch-item"><div class="watch-box"><img></div></div>'),
        movieInfoDivObj: $('<div class="movie-info-box row"> <div class="col-xs-4"> <div class="movie-info-label"></div>' +
            '</div> <div class="col-xs-8"> <div class="movie-info-value"></div> </div> </div>'),
        reviewDivObj: $('<div class="movie-review"> <div class="review-text"> </div>' +
            '<div class="review-source"><div class="review-source-person"> </div>' +
            '<div class="review-source-website"> </div></div> </div>'),
        downloadItemDivObj: $('<div class="download-item"> <div class="row"> <div class="download-file-icon"><img></div>' +
            '<div class="download-file-data"> <div class="download-file-name"></div> <div class="download-file-link"><a></a></div>' +
            '<div class="download-progress-detail"></div> <div class="download-progress-bar"><div class="download-complete-part"></div></div>' +
            '<div class="download-file-options"></div><div class="download-file-remove"></div> </div> </div> </div>')
    };
    function hideAllSection() {
        $(".search-wrapper").hide();
        $(".results-wrapper").hide();
        $(".trending-wrapper").hide();
        $(".movie-wrapper").hide();
        $(".serie-wrapper").hide();
        $(".downloads-wrapper").hide();
    }

    function clearAllData(except) {
        clearAllMovieData();
        clearAllTVData();
        clearSearchList();
        clearAllDownloadData();
    }

    function showHome() {
        bringe.page = "home";
        $("#search-input").val("");
        $("#search-input").focus();
        $(".search-wrapper").show();
        $(".trending-wrapper").show();
        $(".results-wrapper").show();
    }

    function hideTrending() {
        $(".trending-wrapper").hide();
    }

    function showDownloadSection() {
        $(".downloads-wrapper").show();
    }

    function showMoviePart() {
        bringe.page = "movie";
        $(".movie-wrapper").show();
    }

    function showSeriePart() {
        bringe.page = "serie";
        showActiveSerieLevel();
        $(".serie-wrapper").show();
    }

    function showActiveSerieLevel() {
        if (bringe.serieLevel === "serie") {
            showSerieLevel();
        } else if (bringe.serieLevel === "season") {
            showSeasonLevel();
        } else if (bringe.serieLevel === "episode") {
            showEpisodeLevel();
        }
    }

    function showSerieLevel() {
        bringe.page = "serie";
        bringe.serieLevel = "serie";
        $("#route-serie").html("");
        $("#route-season").html("");
        $("#route-episode").html("");
        $("#route-serie").hide();
        $("#route-season").hide();
        $("#route-episode").hide();
        $(".serie-wrapper").show();
        $(".season-level").hide();
        $(".episode-level").hide();
        $(".serie-level").show();
    }

    function showSeasonLevel() {
        bringe.page = "serie";
        bringe.serieLevel = "season";
        if (bringe.serie && bringe.serie.onlySeason) {
            $("#route-serie").html('');
            $("#route-serie").hide();
        } else {
            $("#route-serie").html(bringe.serie.title);
            $("#route-serie").show();
        }
        $("#route-season").html(bringe.season.title);
        $("#route-episode").html("");
        $("#route-episode").hide();
        $("#route-season").show();
        $("#route-episode").hide();
        $(".serie-wrapper").show();
        $(".serie-level").hide();
        $(".episode-level").hide();
        $(".season-level").show();
    }

    function showEpisodeLevel() {
        bringe.page = "serie";
        bringe.serieLevel = "episode";
        if (bringe.serie && bringe.serie.onlySeason) {
            $("#route-serie").html('');
            $("#route-serie").hide();
        } else {
            $("#route-serie").html(bringe.serie.title);
            $("#route-serie").show();
        }
        $("#route-season").html(bringe.season.title);
        $("#route-episode").html(bringe.episode.title);
        $("#route-season").show();
        $("#route-episode").show();
        $(".serie-wrapper").show();
        $(".serie-level").hide();
        $(".season-level").hide();
        $(".episode-level").show();
    }

    function goToHome() {
        hideAllSection();
        clearAllData();
        removeSearchResultText();
        showHome();
    }

    function setupDownloadSection() {
        hideAllSection();
        clearAllDownloadData();
        placeDownloadSection();
        showDownloadSection();
    }

    function goBackFromDownloads() {
        if (bringe.page == "home") {
            hideAllSection();
            showHome();
        } else if (bringe.page == "movie") {
            hideAllSection();
            showMoviePart();
        } else if (bringe.page == "serie") {
            hideAllSection();
            showSeriePart();
        }
    }

    function clearAllMovieData() {
        bringe.movie = {};
        var movieWrapper = $(".movie-wrapper");
        var movieDataSection = $(".movie-data-section");
        $(".movie-rating-box").hide();
        $("#movie-reviews-header").hide();
        $("#movie-social-header").hide();
        $("#movieStreamButton").hide();
        $("#movieTrailerButton").hide();
        $("#movieSubtitleButton").hide();
        movieWrapper.find(".cast-section").hide();
        movieWrapper.find(".watch-section").hide();
        movieWrapper.find(".synopsis-section").hide();
        movieWrapper.find(".movieInfo-section").hide();
        movieDataSection.hide();
        $(".movie-download-section").hide();
        movieWrapper.hide();
        movieWrapper.find(".cast-list").html("");
        movieWrapper.find("#movie-watch-list").html("");
        $("#movie-synopsis").html("");
        $("#movie-reviews").html("");
        $("#movieSocialList").html("");
        $("#movieInfoList").html("");
        $(".movie-poster").find("img").attr("src", "");
        $(".movieLoader").remove();
        movieDataSection.find(".movie-name").html("");
        movieDataSection.find(".movie-year").html("");
        movieDataSection.find(".movie-rating").html("");
    }

    function clearAllTVData() {
        $("#link-route").hide();
        clearAllSerieData();
        clearAllSeasonData();
        clearAllEpisodeData();
    }

    function clearAllSerieData() {
        bringe.serie = {};
        var wrapper = $(".serie-level");
        var serieDataSection = $(".serie-data-section");
        wrapper.find(".serie-rating-box").hide();
        wrapper.find(".cast-section").hide();
        wrapper.find(".seasons-section").hide();
        wrapper.find(".synopsis-section").hide();
        wrapper.find(".serie-data-section").hide();
        wrapper.find(".serieInfo-section").hide();
        wrapper.hide();
        wrapper.find(".cast-list").html("");
        wrapper.find(".seasons-list").html("");
        $("#serie-synopsis").html("");
        $("#serieInfoList").html("");
        $(".serie-poster").find("img").attr("src", "");
        $(".serieLoader").remove();
        serieDataSection.find(".serie-name").html("");
        serieDataSection.find(".serie-year").html("");
        serieDataSection.find(".serie-rating").html("");
    }

    function clearAllSeasonData() {
        bringe.season = null;
        var wrapper = $(".season-level");
        var serieDataSection = $(".season-data-section");
        wrapper.find(".season-rating-box").hide();
        wrapper.find(".cast-section").hide();
        wrapper.find(".episodes-section").hide();
        wrapper.find(".synopsis-section").hide();
        wrapper.find(".season-data-section").hide();
        wrapper.find(".seasonInfo-section").hide();
        wrapper.hide();
        wrapper.find(".cast-list").html("");
        wrapper.find(".episodes-list").html("");
        $("#season-synopsis").html("");
        $("#seasonInfoList").html("");
        $(".season-poster").find("img").attr("src", "");
        $(".seasonLoader").remove();
        serieDataSection.find(".season-name").html("");
        serieDataSection.find(".season-year").html("");
        serieDataSection.find(".season-rating").html("");
    }

    function clearAllEpisodeData() {
        bringe.episode = null;
        var wrapper = $(".episode-level");
        var serieDataSection = $(".episode-data-section");
        $("#episodeStreamButton").hide();
        $("#episodeTrailerButton").hide();
        $("#episodeSubtitleButton").hide();
        wrapper.find(".episode-rating-box").hide();
        wrapper.find(".cast-section").hide();
        wrapper.find(".synopsis-section").hide();
        wrapper.find(".episode-data-section").hide();
        wrapper.find("#episode-download-section").hide();
        wrapper.find(".episodeInfo-section").hide();
        wrapper.find(".episodeSynopsis-section").hide();
        wrapper.find(".watch-section").hide();
        wrapper.hide();
        wrapper.find(".cast-list").html("");
        $("#episode-synopsis").html("");
        $("#episodeInfoList").html("");
        $("#episode-watch-list").html("");
        $(".episode-poster").find("img").attr("src", "");
        $(".episodeLoader").remove();
        serieDataSection.find(".episode-name").html("");
        serieDataSection.find(".episode-year").html("");
        serieDataSection.find(".episode-rating").html("");
    }

    function clearAllDownloadData() {
        $("#download-list").html("");
    }

    function resetDownloadItemBox(downloadItemBox, id) {
        var downloads = _require(['downloads'])[0];
        downloads.getAndPlaceDownloadItemById(id, function (downloadItem) {
            if (downloadItem.exists) {
                var fileProgressBar = downloadItemBox.find(".download-progress-bar");
                var fileCompletePart = fileProgressBar.find(".download-complete-part");
                var fileProgressDetail = downloadItemBox.find(".download-progress-detail");
                var fileActionBox = downloadItemBox.find(".download-file-options");
                var fileRemoveBox = downloadItemBox.find(".download-file-remove");
                var detail = "";
                if (downloadItem.state == "in_progress") {
                    var last = fileProgressDetail.data("completed");
                    fileProgressDetail.data("completed", downloadItem.bytesReceived);
                    if (last && !downloadItem.paused) {
                        detail += downloads.getSizeInWords(downloadItem.bytesReceived - last) + "/s - ";
                    }
                    detail += downloads.getSizeInWords(downloadItem.bytesReceived) + " of " + downloads.getSizeInWords(downloadItem.totalBytes) + ", ";
                    if (downloadItem.paused) {
                        detail += "Paused ";
                    }
                    if (downloadItem.estimatedEndTime) {
                        var estimatedEndTime = new Date(downloadItem.estimatedEndTime);
                        var nowTime = new Date();
                        detail += util.getTimeInWords(estimatedEndTime.getTime() - nowTime.getTime()) + " left";
                    }
                    fileProgressDetail.html(detail);
                    var completePercentage = downloads.getCompletedPercentage(downloadItem.bytesReceived, downloadItem.totalBytes);
                    fileCompletePart.css("width", completePercentage + "%");
                    fileProgressBar.css("height", "3px");
                    if (downloadItem.paused == false && fileActionBox.find(".pause-button").length == 0) {
                        fileActionBox.html("");
                        fileActionBox.append(downloads.getPauseButton(downloadItem.id));
                        fileActionBox.append(downloads.getCancelButton(downloadItem.id));
                    } else if (downloadItem.paused && fileActionBox.find(".resume-button").length == 0) {
                        fileActionBox.html("");
                        fileActionBox.append(downloads.getResumeButton(downloadItem.id));
                        fileActionBox.append(downloads.getCancelButton(downloadItem.id));
                    }
                } else if (downloadItem.state == "interrupted" && fileActionBox.find(".retry-button").length == 0) {
                    fileActionBox.html("");
                    fileActionBox.append(downloads.getRetryButton(downloadItem));
                    fileProgressDetail.html("");
                    fileProgressBar.css("height", "0px");
                    fileRemoveBox.html("x");
                } else if (downloadItem.state == "complete" && fileActionBox.find(".open-button").length == 0) {
                    fileActionBox.html("");
                    fileProgressDetail.html("");
                    fileProgressBar.css("height", "0px");
                    fileActionBox.append(downloads.getOpenButton(downloadItem.id));
                    fileActionBox.append(downloads.getShowInFolderButton(downloadItem.id));
                    fileRemoveBox.html("x");
                }
                setTimeout(function () {
                    resetDownloadItemBox(downloadItemBox, id)
                }, 1000);
            } else {
                downloadItemBox.remove();
            }
        });
    }

    function placeDownloadSection() {
        $("#download-list").html("");
        bringe.downloadActive = true;
        chrome.downloads.search({filenameRegex: "Bringe", exists: true}, function (results) {
            var downloadList = [], i;
            for (i = 0; i < results.length; i++) {
                var item = results[i];
                if (item.byExtensionId == "npppfccdplcbhbcnbdgchlnbfhmemfja") {
                    downloadList.push(item);
                }
            }
            downloadList.sort(util.downloadComparator);
            var downloadListBox = $("#download-list");
            var downloads = _require(['downloads'])[0];
            for (i = 0; i < downloadList.length; i++) {
                downloads.getAndPlaceDownloadItemById(downloadList[i].id, function (downloadItem) {
                    var downloadItemBox = globalDivs.downloadItemDivObj.clone();
                    downloadItemBox.find(".download-file-name").html(util.extractFileName(downloadItem.filename));
                    var fileLinkBox = downloadItemBox.find(".download-file-link");
                    var fileIconBox = downloadItemBox.find(".download-file-icon");
                    var fileRemoveBox = downloadItemBox.find(".download-file-remove");
                    fileLinkBox.html(downloadItem.finalUrl);
                    fileLinkBox.data("href", downloadItem.finalUrl);
                    downloadListBox.append(downloadItemBox);
                    downloads.getAndPlaceDownloadItemIcon(downloadItem.id, fileIconBox, function (iconUrl, iconBox) {
                        iconBox.find("img").attr("src", iconUrl);
                    });
                    fileLinkBox.click(function (evt) {
                        var link = evt.target;
                        background.openLinkInBrowser($(link).data("href"));
                    });
                    fileRemoveBox.click(function () {
                        bringe.downloadActive = false;
                        chrome.downloads.erase({id: downloadItem.id}, function () {
                            placeDownloadSection();
                        });
                    });
                    resetDownloadItemBox(downloadItemBox, downloadItem.id);
                });
            }
        });
    }

    function showTrendingMovies(movies) {
        var trendingList = $("#trendingList"),
            trendingMovieDiv;
        util.each(movies, function (movie, i) {
            if (i < 15) {
                trendingMovieDiv = globalDivs.trendingMovieObj.clone();
                trendingMovieDiv.find('.tr-movie-img img').attr("src", movie.posters.primary);
                trendingMovieDiv.find('.tr-name').html(movie.title);
                trendingMovieDiv.find('.tr-rate').html(movie.tomatoScore);
                trendingMovieDiv.attr("data-index", i);
                trendingMovieDiv.click(function () {
                    var box = $(this);
                    util.fireEvent("getTrendingMovies", [box.attr("data-index")]);
                });
                trendingList.append(trendingMovieDiv);
            }
        });
    }

    function placeMoviesList(movies) {
        var movie, i,
            resultOptionBar = $(".resultOptionBar"),
            moviesResultsList = $("#moviesResultsList");
        moviesResultsList.html("");
        resultOptionBar.find('#moviesResultsButton').show();
        for (i = 0; i < movies.length; i++) {
            movie = movies[i];
            if (!movie.meterScore) {
                continue;
            }
            var searchMovieDiv = globalDivs.searchMovieDivObj.clone();
            searchMovieDiv.attr("id", "movieIndex_" + i);
            if (movie.image) {
                movie.image = movie.image.replace("https", "http");
                searchMovieDiv.find(".searchMovieImage").find("img").attr("src", movie.image);
            }
            if (movie.name) {
                if (movie.year) {
                    searchMovieDiv.find(".searchMovieName").html(movie.name + " (" + movie.year + ")");
                } else {
                    searchMovieDiv.find(".searchMovieName").html(movie.name);
                }
            }
            if (movie.subline) {
                searchMovieDiv.find(".searchMovieSubline").html(movie.subline);
            }
            if (movie.meterScore) {
                searchMovieDiv.find(".searchMovieRatingValue").html(movie.meterScore);
            } else {
                searchMovieDiv.find(".searchMovieRating").remove();
            }
            moviesResultsList.append(searchMovieDiv);
        }
        $(".searchMovie").click(function (e) {
            var movieId = $(this).attr("id");
            var movieIndex = movieId.split("_")[1];
            util.fireEvent("getMovie", [movieIndex]);
        });
    }

    function placeSeriesList(series) {
        var serie, i,
            resultOptionBar = $(".resultOptionBar"),
            seriesResultsList = $("#seriesResultsList");
        seriesResultsList.html("");
        resultOptionBar.find('#seriesResultsButton').show();
        for (i = 0; i < series.length; i++) {
            serie = series[i];
            var searchSerieDiv = globalDivs.searchSerieDivObj.clone();
            searchSerieDiv.attr("id", "serieIndex_" + i);
            if (serie.image) {
                serie.image = serie.image.replace("https", "http");
                searchSerieDiv.find(".searchSerieImage").find("img").attr("src", serie.image);
            }
            if (serie.title) {
                searchSerieDiv.find(".searchSerieName").html(serie.title);
            }
            if (serie.startYear) {
                var yearPart = serie.startYear;
                if (serie.endYear) {
                    yearPart += " - " + serie.endYear;
                }
                serie.year = yearPart;
                searchSerieDiv.find(".searchSerieYear").html('(' + yearPart + ')');
            }
            if (serie.meterScore) {
                searchSerieDiv.find(".searchSerieRatingValue").html(serie.meterScore);
            } else {
                searchSerieDiv.find(".searchSerieRating").remove();
            }
            seriesResultsList.append(searchSerieDiv);
        }
        $(".searchSerie").click(function (e) {
            var serieId = $(this).attr("id");
            var serieIndex = serieId.split("_")[1];
            util.fireEvent("getSerie", [serieIndex]);
        });
    }

    function setMovieListVisible() {
        $("#seriesResultsButton").removeClass("activeTab");
        $("#moviesResultsButton").addClass("activeTab");
        $("#seriesResultsList").hide();
        $("#moviesResultsList").show();
    }
    function setSerieListVisible() {
        $("#moviesResultsButton").removeClass("activeTab");
        $("#seriesResultsButton").addClass("activeTab");
        $("#moviesResultsList").hide();
        $("#seriesResultsList").show();
    }

    function showMovieStreamLink() {
        $("#movieStreamButton").show();
        $(".movieLoader").remove();
    }

    function showMovieTrailerLink() {
        $("#movieTrailerButton").show();
    }

    function showEpisodeTrailerLink() {
        $("#episodeTrailerButton").show();
    }

    function showEpisodeStreamLink() {
        $("#episodeStreamButton").show();
    }

    function clearSearchList() {
        bringe.searchResults.movies = null;
        bringe.searchResults.series = null;
        $(".searchResultList").html("");
        $(".searchResultList").hide();
        $('.resultOptionButton').hide();
        $(".resultOptionButton").removeClass("activeTab");
    }

    function showRTMovie() {
        var wrapper = $(".movie-wrapper"),
            infoList,
            thisMovie = bringe.movie;
        removeRottenLoader();
        var castList = wrapper.find(".cast-list"),
            movieDataSection = $(".movie-data-section"),
            i;
        for (i = 0; i < thisMovie.cast.length; i++) {
            var person = thisMovie.cast[i];
            var castMemberDiv = globalDivs.castMemberDivObj.clone();
            castMemberDiv.find("img").attr("src", person.image);
            castMemberDiv.find(".cast-name").html(person.name);
            castMemberDiv.find(".cast-role").html(person.role);
            castList.append(castMemberDiv);
        }
        if (thisMovie.cast.length) {
            wrapper.find(".cast-section").show();
            castList.find(".cast-member").click(function (evt) {
                var obj = $(this);
                var name = obj.find(".cast-name").html();
                util.fireEvent("searchOnGoogle", [name]);
            });
        } else {
            wrapper.find(".cast-section").hide();
        }
        $("#movie-synopsis").html(thisMovie.synopsis);
        infoList = $("#movieInfoList");
        wrapper.find(".synopsis-section").show();
        var infos = thisMovie.infoList;
        for (i = 0; i < infos.length; i++) {
            var serieInfoDiv = globalDivs.movieInfoDivObj.clone();
            serieInfoDiv.find(".movie-info-label").html(infos[i].label);
            serieInfoDiv.find(".movie-info-value").html(infos[i].value);
            infoList.append(serieInfoDiv);
        }
        if (thisMovie.images && thisMovie.images.thumbnail || thisMovie.images.coverImage) {
            if (thisMovie.images.image) {
                $(".movie-poster").find("img").attr("src", thisMovie.images.image);
            } else {
                $(".movie-poster").find("img").attr("src", thisMovie.images.thumbnail);
            }
        }
        movieDataSection.find(".movie-name").html(thisMovie.title);
        movieDataSection.find(".movie-year").html('(' + thisMovie.year + ')');
        if (thisMovie.ratings && thisMovie.ratings.meterScore) {
            $("#movie-rotten-rating").html(thisMovie.ratings.meterScore + "%");
            $("#rotten-movie-rating-box").show();
        }
        if (thisMovie.ratings && thisMovie.ratings.audienceScore) {
            $(".movie-data-section").find("#movie-audience-rating").html(thisMovie.ratings.audienceScore);
            $("#audience-movie-rating-box").show();
        }
        $(".movieInfo-section").show();
        movieDataSection.show();
        $(".movie-download-section").show();
        $(".synopsis-section").show();
    }

    function showRTSerie() {
        var wrapper = $(".serie-level"),
            watching = bringe.serie,
            infoList,
            dataSection = $(".serie-data-section"),
            thisSerie = bringe.serie;
        removeRottenLoader();
        $("#link-route").show();

        dataSection.find(".serie-name").html(thisSerie.title);
        var year = thisSerie.startYear;
        if (thisSerie.endYear) {
            year += ' - ' + thisSerie.endYear;
        }
        var image = thisSerie.image || thisSerie.thumbnail;
        $(".serie-poster").find("img").attr("src", image);
        dataSection.find(".serie-year").html('(' + year + ')');
        if (thisSerie.ratings.rotten) {
            $("#serie-rotten-rating").html(thisSerie.ratings.rotten + "%");
            $("#rotten-serie-rating-box").show();
        } else {
            $("#serie-rotten-rating").html("");
            $("#rotten-serie-rating-box").hide();
        }
        if (thisSerie.ratings.audienceScore) {
            $("#serie-audience-rating").html(thisSerie.ratings.audienceScore);
            $("#audience-serie-rating-box").show();
        } else {
            $("#serie-rotten-rating").html("");
            $("#rotten-serie-rating-box").hide();
        }
        var castList = wrapper.find(".cast-list"),
            i;
        for (i = 0; i < watching.cast.length; i++) {
            var person = watching.cast[i];
            var castMemberDiv = globalDivs.castMemberDivObj.clone();
            castMemberDiv.find("img").attr("src", person.image);
            castMemberDiv.find(".cast-name").html(person.name);
            castMemberDiv.find(".cast-role").html(person.role);
            castList.append(castMemberDiv);
        }
        if (watching.cast.length) {
            wrapper.find(".cast-section").show();
            wrapper.find(".cast-section").show();
            castList.find(".cast-member").click(function (evt) {
                var obj = $(this);
                var name = obj.find(".cast-name").html();
                util.fireEvent("searchOnGoogle", [name]);
            });
        } else {
            wrapper.find(".cast-section").hide();
        }
        $("#serie-synopsis").html(watching.synopsis);
        infoList = $("#serieInfoList");
        wrapper.find(".synopsis-section").show();
        var infos = watching.infoList;
        for (i = 0; i < infos.length; i++) {
            var serieInfoDiv = globalDivs.movieInfoDivObj.clone();
            serieInfoDiv.find(".movie-info-label").html(infos[i].label);
            serieInfoDiv.find(".movie-info-value").html(infos[i].value);
            infoList.append(serieInfoDiv);
        }
        dataSection.show();
        $(".serieInfo-section").show();
        var seasonsList = wrapper.find(".seasons-list");
        for (i = watching.seasons.length - 1; i >= 0; i--) {
            var season = watching.seasons[i];
            var seasonListDiv = globalDivs.seasonListDivObj.clone();
            seasonListDiv.attr("id", "season_" + i);
            seasonListDiv.find(".seasonListImage").find("img").attr("src", season.image);
            seasonListDiv.find(".seasonListName").html(season.title);
            seasonListDiv.find(".seasonListConsensus").html(season.consensus);
            seasonListDiv.find(".seasonListInfo").html(season.info);
            if (season.ratings && season.ratings.rotten) {
                seasonListDiv.find(".seasonListRatingValue").html(season.ratings.rotten.slice(0, -1));
            } else {
                seasonListDiv.find(".seasonListRating").hide();
            }
            seasonsList.append(seasonListDiv);
        }
        $(".seasonListDiv").click(function (e) {
            var seasonId = $(this).attr("id");
            var seasonIndex = seasonId.split("_")[1];
            util.fireEvent("getSeason", [seasonIndex]);
        });
        wrapper.find(".seasons-section").show();
    }

    function showRTSeasonData() {
        var wrapper = $(".season-level"),
            thisSeason = bringe.season,
            watching = thisSeason,
            infoList,
            castList = wrapper.find(".cast-list"),
            dataSection = $(".season-data-section"),
            i;
        removeRottenLoader();
        $("#link-route").show();
        $(".season-poster").find("img").attr("src", thisSeason.image);
        dataSection.find(".season-name").html(thisSeason.title);
        if (thisSeason.info) {
            dataSection.find(".season-year").html('(' + thisSeason.info + ')');
        } else {
            dataSection.find(".season-year").html('');
        }
        if (thisSeason.ratings && thisSeason.ratings.rotten) {
            $("#season-rotten-rating").html(thisSeason.ratings.rotten);
            $("#rotten-season-rating-box").show();
        } else {
            $("#season-rotten-rating").html("");
            $("#rotten-season-rating-box").hide();
        }
        if (thisSeason.ratings && thisSeason.ratings.audienceScore) {
            $("#season-audience-rating").html(thisSeason.ratings.audienceScore);
            $("#audience-season-rating-box").show();
        } else {
            $("#season-audience-rating").html("");
            $("#audience-season-rating-box").hide();
        }
        for (i = 0; i < watching.cast.length; i++) {
            var person = watching.cast[i];
            var castMemberDiv = globalDivs.castMemberDivObj.clone();
            castMemberDiv.find("img").attr("src", person.image);
            castMemberDiv.find(".cast-name").html(person.name);
            castMemberDiv.find(".cast-role").html(person.role);
            castList.append(castMemberDiv);
        }
        if (watching.cast.length) {
            wrapper.find(".cast-section").show();
            wrapper.find(".cast-section").show();
            castList.find(".cast-member").click(function (evt) {
                var obj = $(this);
                var name = obj.find(".cast-name").html();
                util.fireEvent("searchOnGoogle", [name]);
            });
        } else {
            wrapper.find(".cast-section").hide();
        }
        $("#season-synopsis").html(watching.synopsis);
        infoList = $("#seasonInfoList");
        wrapper.find(".synopsis-section").show();
        var infos = watching.infoList;
        for (i = 0; i < infos.length; i++) {
            var serieInfoDiv = globalDivs.movieInfoDivObj.clone();
            serieInfoDiv.find(".movie-info-label").html(infos[i].label);
            serieInfoDiv.find(".movie-info-value").html(infos[i].value);
            infoList.append(serieInfoDiv);
        }
        dataSection.show();
        $(".seasonInfo-section").show();
    }

    function showRTEpisodesList() {
        var wrapper = $(".season-level"),
            watching = bringe.season,
            episodesList = wrapper.find(".episodes-list");
        for (var i = 0; i < watching.episodes.length; i++) {
            var episode = watching.episodes[i];
            var episodeListDiv = globalDivs.episodeListDivObj.clone();
            episodeListDiv.attr("id", "episode_" + i);
            episodeListDiv.find(".episodeListName").html(episode.title);
            episodeListDiv.find(".episodeListNumber").html(episode.episodeNo);
            episodeListDiv.find(".episodeListDate").html(episode.date);
            episodeListDiv.find(".episodeListSynopsis").html(episode.synopsis);
            if (episode.ratings && episode.ratings.rotten) {
                episodeListDiv.find(".episodeListRatingValue").html(episode.ratings.rotten);
            } else {
                episodeListDiv.find(".episodeListRating").hide();
            }
            episodesList.append(episodeListDiv);
        }
        $(".episodeListDiv").click(function (e) {
            var episodeId = $(this).attr("id");
            var episodeIndex = episodeId.split("_")[1];
            util.fireEvent("getEpisode", [episodeIndex]);
        });
        wrapper.find(".episodes-section").show();
    }

    function showRTEpisodeData() {
        var wrapper = $(".episode-level"),
            thisEpisode = bringe.episode,
            watching = thisEpisode,
            infoList,
            castList = wrapper.find(".cast-list"),
            dataSection = $(".episode-data-section"),
            i;
        removeRottenLoader();
        $("#link-route").show();
        $(".episode-poster img").attr("src", watching.image);
        dataSection.find(".episode-name").html(thisEpisode.title);
        if (thisEpisode.date) {
            dataSection.find(".episode-year").html('(' + thisEpisode.date + ')');
        }
        if (thisEpisode.ratings && thisEpisode.ratings.rotten) {
            $("#episode-rotten-rating").html(thisEpisode.ratings.rotten + "%");
            $("#rotten-episode-rating-box").show();
        } else {
            $("#episode-rotten-rating").html("");
            $("#rotten-episode-rating-box").hide();
        }
        if (thisEpisode.ratings && thisEpisode.ratings.audienceScore) {
            $("#episode-audience-rating").html(thisEpisode.ratings.audienceScore);
            $("#audience-episode-rating-box").show();
        } else {
            $("#episode-audience-rating").html("");
            $("#audience-episode-rating-box").hide();
        }
        if (thisEpisode.ratings.imdb) {
            $("#episode-imdb-rating").html(thisEpisode.ratings.imdb);
            $("#imdb-episode-rating-box").show();
        } else {
            $("#episode-imdb-rating").html("");
            $("#imdb-episode-rating-box").hide();
        }
        for (i = 0; i < watching.cast.length; i++) {
            var person = watching.cast[i];
            var castMemberDiv = globalDivs.castMemberDivObj.clone();
            castMemberDiv.find("img").attr("src", person.image);
            castMemberDiv.find(".cast-name").html(person.name);
            castMemberDiv.find(".cast-role").html(person.role);
            castList.append(castMemberDiv);
        }
        if (watching.cast.length) {
            wrapper.find(".cast-section").show();
            wrapper.find(".cast-section").show();
            castList.find(".cast-member").click(function (evt) {
                var obj = $(this);
                var name = obj.find(".cast-name").html();
                util.fireEvent("searchOnGoogle", [name]);
            });
        } else {
            wrapper.find(".cast-section").hide();
        }
        $("#episode-synopsis").html(watching.synopsis);
        infoList = $("#episodeInfoList");
        wrapper.find(".synopsis-section").show();
        var infos = watching.infoList;
        for (i = 0; i < infos.length; i++) {
            var serieInfoDiv = globalDivs.movieInfoDivObj.clone();
            serieInfoDiv.find(".movie-info-label").html(infos[i].label);
            serieInfoDiv.find(".movie-info-value").html(infos[i].value);
            infoList.append(serieInfoDiv);
        }
        dataSection.show();
        $("#episode-download-section").show();
        $(".episodeInfo-section").show();
        $(".episodeSynopsis-section").show();
        showExternalEpisodeStreaming();
    }

    function placeImdbMovieRating() {
        if (bringe.movie.ratings && bringe.movie.ratings.imdbRating) {
            $("#movie-imdb-rating").html(bringe.movie.ratings.imdbRating);
            $("#imdb-movie-rating-box").show();
        }
        if (bringe.movie.ratings && bringe.movie.ratings.metaRating) {
            $("#movie-metacritic-rating").html(bringe.movie.ratings.metaRating);
            $("#metacritic-movie-rating-box").show();
        }
    }

    function placeImdbSerieRating() {
        if (bringe.serie.ratings.imdbRating) {
            $("#serie-imdb-rating").html(bringe.serie.ratings.imdbRating);
            $("#imdb-serie-rating-box").show();
        }
        if (bringe.serie.ratings.metaRating) {
            $("#serie-metacritic-rating").html(bringe.serie.ratings.metaRating);
            $("#metacritic-serie-rating-box").show();
        }
    }

    function placeGoogleMovieData() {
        if (bringe.movie.reviews) {
            $("#movie-reviews-header").show();
            var reviewsDiv = $("#movie-reviews");
            util.each(bringe.movie.reviews, function (review) {
                var reviewDiv = globalDivs.reviewDivObj.clone();
                reviewDiv.find(".review-text").html(review.text);
                if (review.source.name) {
                    reviewDiv.find(".review-source-person").html("-" + review.source.name);
                }
                if (review.source.sourceSite) {
                    reviewDiv.find(".review-source-website").html('(' + review.source.sourceSite + ')');
                }
                reviewsDiv.append(reviewDiv);
            });
        }
        if (bringe.movie.social) {
            $("#movie-social-header").show();
            var socialList = $("#movieSocialList");
            util.each(bringe.movie.social, function(social) {
                var socialDiv = $('<div class="socialBox"><div class="socialImg"><i class="fa fa-fw" aria-hidden="true"></i></div>');
                socialDiv.attr("data-href", social.link);
                socialDiv.find("i").addClass(iconMap[social.site]);
                socialList.append(socialDiv);
                socialDiv.click(function (evt) {
                    background.openLinkInBrowser(this.getAttribute("data-href"));
                });
            });
        }
    }

    function showExternalMovieStreaming() {
        var extStreams = bringe.movie && bringe.movie.externalStreams;
        if (extStreams && extStreams.length > 0) {
            $(".movie-wrapper .watch-section").show();
            var list = $("#movie-watch-list");
            for (var i = 0; i < extStreams.length; i++) {
                var stream = extStreams[i];
                var watchItem = globalDivs.watchItemDivObj.clone();
                watchItem.find("img").attr("src", stream.image);
                watchItem.find(".watch-box").attr("data-href", stream.link);
                list.append(watchItem);
            }
            list.find(".watch-box").click(function () {
                background.openLinkInBrowser(this.getAttribute("data-href"));
            });
        }
    }

    function showExternalEpisodeStreaming() {
        var websites = bringe.serie && bringe.serie.websites,
            seasonNo = bringe.season.seasonNo;
        if (websites && websites.watchit && websites.watchit.seasons && websites.watchit.seasons[seasonNo + ''] && websites.watchit.seasons[seasonNo + ''].externalStreams && websites.watchit.seasons[seasonNo + ''].externalStreams.length > 0) {
            var externalStreams = websites.watchit.seasons[seasonNo + ''].externalStreams;
            $(".serie-wrapper .watch-section").show();
            var list = $("#episode-watch-list");
            for (var i = 0; i < externalStreams.length; i++) {
                var stream = externalStreams[i];
                var watchItem = globalDivs.watchItemDivObj.clone();
                watchItem.find("img").attr("src", stream.image);
                watchItem.find(".watch-box").attr("data-href", stream.link);
                list.append(watchItem);
            }
            list.find(".watch-box").click(function () {
                background.openLinkInBrowser(this.getAttribute("data-href"));
            });
        }
    }

    function showSubtitleLink() {
        $("#movieSubtitleButton").show();
    }

    function showEpisodeSubtitleLink() {
        $("#episodeSubtitleButton").show();
    }

    function clearPopup() {
        var popupBox = $(".popup-box");
        var table = popupBox.find("table");
        popupBox.find(".popup-header").html("");
        table.find("thead").html("");
        table.find("tbody").html("");
    }

    function openPopup() {
        $(".popup-wrapper").show();
        $("body").addClass("stop-scrolling");
    }

    function closePopup() {
        $(".popup-wrapper").hide();
        $("body").removeClass("stop-scrolling");
        clearPopup();
    }

    function openWaiter(text) {
        $(".waiter-text").find("p").html(text);
        $(".waiter-wrapper").show();
        $("body").addClass("stop-scrolling");
    }

    function closeWaiter() {
        $(".waiter-wrapper").hide();
        $(".waiter-text").find("p").html("");
        $("body").removeClass("stop-scrolling");
    }

    function showRottenLoader(obj) {
        $('.rotten-buffer').remove();
        var buffer = $('<div class="rotten-buffer"><img class="fa-spin" src="../images/bringe-48.png"></div>');
        obj.append(buffer);
    }

    function removeRottenLoader() {
        $('.rotten-buffer').remove();
    }

    function openEpisodesStreamPopup(streamLinks) {
        clearPopup();
        var popupBox = $(".popup-box");
        popupBox.find(".popup-header").html("Episode Links");
        var table = popupBox.find("table");
        var thead = table.find("thead");
        //thead.append('<tr> <td>Source</td> <td>Quality</td> <td>Format</td> </tr>');
        var tbody = table.find("tbody");
        for (var i = 0; i < streamLinks.length; i++) {
            var link = streamLinks[i];
            var row = $('<tr data-id="' + link.source + '"> <td data-id="' + link.id + '">Server ' + (i+1) + '</td> <td class="streamQuality">' + link.label + '</td> <td class="streamEpisode">Stream Episode</td> <td class="downloadEpisode">Download</td> </tr>');
            tbody.append(row);
            var downloadButton = row.find(".downloadEpisode");
            var streamButton = row.find(".streamEpisode");
            downloadButton.click(function (evt) {
                closePopup();
                var obj = $(this),
                    line = obj.parent(),
                    source = line.attr("data-id"),
                    tds = line.find("td"),
                    id = $(tds[0]).attr("data-id");
                util.fireEvent("downloadSerieStream", [{id: id, source: source}]);
            });
            streamButton.click(function (evt) {
                closePopup();
                var obj = $(this),
                    line = obj.parent(),
                    source = line.attr("data-id"),
                    tds = line.find("td"),
                    id = $(tds[0]).attr("data-id");
                util.fireEvent("openSerieStream", [{id: id, source: source}]);
            });
        }
        openPopup();
    }

    function openMovieStreamPopup(movie) {
        clearPopup();
        var popupBox = $(".popup-box");
        popupBox.find(".popup-header").html("Stream Movie");
        var table = popupBox.find("table");
        var thead = table.find("thead");
        //thead.append('<tr> <td>Source</td> <td>Quality</td> <td>Format</td> </tr>');
        var tbody = table.find("tbody");
        var linksObj = movie.streamLinkDetails;
        for (var i = 0; i < linksObj.length; i++) {
            var linkObj = linksObj[i];
            var ext = linkObj.type;
            var serverId = linkObj.id.split("*")[0];
            var row = $('<tr class="' + linkObj.id + '"> <td>#' + serverId + '</td> <td>' + linkObj.label + '</td> <td class="movieStream">Stream</td> <td class="movieDownload">Download</td> </tr>');
            tbody.append(row);
            var stream = row.find(".movieStream");
            var download = row.find(".movieDownload");
            stream.click(function (evt) {
                closePopup();
                var obj = $(this).parent(),
                    id = obj.attr("class"),
                    tds = obj.find("td"),
                    label = $(tds[1]).html();
                util.fireEvent("openMovieStream", [{id: id, label: label}]);
            });
            download.click(function (evt) {
                closePopup();
                var obj = $(this).parent(),
                    id = obj.attr("class"),
                    tds = obj.find("td"),
                    label = $(tds[1]).html();
                util.fireEvent("downloadMovieStream", [{id: id, label: label}]);
            });
        }
        openPopup();
    }

    function openMovieSubtitlePopup(movie) {
        clearPopup();
        var popupBox = $(".popup-box");
        popupBox.find(".popup-header").html("Download Subtitle");
        var table = popupBox.find("table");
        var thead = table.find("thead");
        thead.append('<tr> <td>Source</td> <td>Rating</td> <td>Format</td> </tr>');
        var tbody = table.find("tbody");
        var linksObj = movie.subtitleLinks;
        for (var i = 0; i < linksObj.length; i++) {
            var linkObj = linksObj[i];
            var ext = "srt";
            var row = $('<tr class="' + linkObj.index + '"> <td><img src="../images/subscene.gif"/></td> <td>' + linkObj.rating + '</td> <td>' + ext + '</td> </tr>');
            tbody.append(row);
            row.click(function (evt) {
                closePopup();
                var obj = $(this);
                var id = obj.attr("class");
                util.fireEvent("downloadMovieSubtitle", [parseInt(id)]);
            });
        }
        openPopup();
    }

    function openEpisodeSubtitlePopup(episode) {
        clearPopup();
        var popupBox = $(".popup-box");
        popupBox.find(".popup-header").html("Download Subtitle");
        var table = popupBox.find("table");
        var thead = table.find("thead");
        thead.append('<tr> <td>Source</td> <td>Rating</td> <td>Format</td> </tr>');
        var tbody = table.find("tbody");
        var linksObj = episode.links;
        if (linksObj) {
            for (var i = 0; i < linksObj.length; i++) {
                var linkObj = linksObj[i];
                var ext = "srt";
                var row = $('<tr class="' + linkObj.index + '"> <td><img src="../images/subscene.gif"/></td> <td>' + linkObj.rating + '</td> <td>' + ext + '</td> </tr>');
                tbody.append(row);
                row.click(function (evt) {
                    closePopup();
                    var obj = $(this);
                    var id = obj.attr("class");
                    util.fireEvent("downloadEpisodeSubtitle", [parseInt(id)]);
                });
            }
            openPopup();
        }
    }

    function openVideoPopup() {
        $(".video-wrapper").show();
    }
    function closeVideoPopup() {
        $(".video-wrapper").hide();
    }
    function openTrailerPopup() {
        $(".youtube-wrapper").show();
    }
    function closeTrailerPopup() {
        $(".youtube-wrapper").hide();
    }

    function shineDownloadButton() {
        $("#downloads-button").addClass("shine");
        setTimeout(function () {
            $("#downloads-button").removeClass("shine");
        }, 500);
    }

    function searching() {
        removeSearchBuffer();
        removeSearchResultText();
        var buffer = $('<div class="search-buffer"><img class="fa-spin" src="../images/bringe-48.png"></div>');
        $(".search-result-wrapper").append(buffer);
    }

    function removeSearchBuffer() {
        $(".search-result-wrapper").find(".search-buffer").remove();
    }

    function showSearchResultText(text) {
        removeSearchResultText();
        var status = $('<div class="search-result-text">' + text + '</div>');
        $(".search-result-wrapper").append(status);
    }

    function removeSearchResultText() {
        $(".search-result-wrapper").find(".search-result-text").remove();
    }

    function findingMovieLink() {
        var loader = $('<div class="movieLoader"><i class="fa fa-spinner fa-spin"></i></div>');
        $(".movieActionButtons").append(loader);
    }

    function couldnotFetchMovieLink() {
        $(".movieLoader").remove();
    }

    function movieLoadComplete() {
        $(".movieLoader").remove();
    }

    return {
        hideAllSection: hideAllSection,
        goToHome: goToHome,
        hideTrending: hideTrending,
        showTrendingMovies: showTrendingMovies,
        placeMoviesList: placeMoviesList,
        placeSeriesList: placeSeriesList,
        setMovieListVisible: setMovieListVisible,
        setSerieListVisible: setSerieListVisible,
        placeDownloadSection: placeDownloadSection,
        showMovieStreamLink: showMovieStreamLink,
        showEpisodeStreamLink: showEpisodeStreamLink,
        showMovieTrailerLink: showMovieTrailerLink,
        showEpisodeTrailerLink: showEpisodeTrailerLink,
        clearSearchList: clearSearchList,
        showRTMovie: showRTMovie,
        showRTSerie: showRTSerie,
        showRTSeasonData: showRTSeasonData,
        showRTEpisodeData: showRTEpisodeData,
        showRTEpisodesList: showRTEpisodesList,
        showMoviePart: showMoviePart,
        showSeriePart: showSeriePart,
        showSerieLevel: showSerieLevel,
        showSeasonLevel: showSeasonLevel,
        showEpisodeLevel: showEpisodeLevel,
        clearAllSerieData: clearAllSerieData,
        clearAllSeasonData: clearAllSeasonData,
        clearAllEpisodeData: clearAllEpisodeData,
        placeImdbMovieRating: placeImdbMovieRating,
        placeImdbSerieRating: placeImdbSerieRating,
        placeGoogleMovieData: placeGoogleMovieData,
        showExternalMovieStreaming: showExternalMovieStreaming,
        showExternalEpisodeStreaming: showExternalEpisodeStreaming,
        showSubtitleLink: showSubtitleLink,
        showEpisodeSubtitleLink: showEpisodeSubtitleLink,
        goBackFromDownloads: goBackFromDownloads,
        setupDownloadSection: setupDownloadSection,
        closePopup: closePopup,
        openWaiter: openWaiter,
        closeWaiter: closeWaiter,
        showRottenLoader: showRottenLoader,
        removeRottenLoader: removeRottenLoader,
        openMovieStreamPopup: openMovieStreamPopup,
        openMovieSubtitlePopup: openMovieSubtitlePopup,
        openEpisodesStreamPopup: openEpisodesStreamPopup,
        openEpisodesSubtitlePopup: openEpisodeSubtitlePopup,
        openVideoPopup: openVideoPopup,
        closeVideoPopup: closeVideoPopup,
        openTrailerPopup: openTrailerPopup,
        closeTrailerPopup: closeTrailerPopup,
        shineDownloadButton: shineDownloadButton,
        showSearchResultText: showSearchResultText,
        searching: searching,
        removeSearchBuffer: removeSearchBuffer,
        findingMovieLink: findingMovieLink,
        couldnotFetchMovieLink: couldnotFetchMovieLink,
        movieLoadComplete: movieLoadComplete
    }
});



_define('layout', [window, 'util', 'bringe'], function (window, util, bringe) {

    var iconMap = {
        facebook: "fa-facebook-square",
        twitter: "fa-twitter-square",
        google: "fa-google-plus-square",
        instagram: "fa-instagram",
        snapchat: "fa-snapchat-square",
        youtube: "fa-youtube-square",
        tumblr: "fa-tumblr-square"
    };
    var globalDivs = {
        trendingMovieObj: $('<div class="trending-movie-box"> <div class="tr-movie-img"> <img> </div>' +
            '<div class="tr-bottom"> <div class="tr-details"><div class="tr-name"></div></div> </div> <div class="tr-rate-box">' +
            '<div class="tr-rate"></div><i class="fa fa-heart" aria-hidden="true"></i> </div> </div>'),
        searchMovieDivObj: $('<div class="searchMovie">' +
            '<div class="searchMovieImage"> <img> </div>' +
            '<div class="searchMovieDetail"> <div class="searchMovieName"></div> <div class="searchMovieSubline"></div> </div> ' +
            '<div class="searchMovieRating">' +
            '<div class="searchMovieRatingValue"></div> <i class="fa fa-heart" aria-hidden="true"></i> </div> </div>'),
        searchSerieDivObj: $('<div class="searchSerie">' +
            '<div class="searchSerieImage"> <img> </div>' +
            '<div class="searchSerieDetail"> <div class="searchSerieName"></div> <div class="searchSerieYear"></div> </div> ' +
            '<div class="searchSerieRating">' +
            '<div class="searchSerieRatingValue"></div> <i class="fa fa-heart" aria-hidden="true"></i> </div> </div>'),
        seasonListDivObj: $('<div class="seasonListDiv">' +
            '<div class="seasonListImage"> <img> </div>' +
            '<div class="seasonListDetail">' +
            '<div class="seasonListName"></div> <div class="seasonListConsensus"></div> <div class="seasonListInfo"></div> </div> ' +
            '<div class="seasonListRating">' +
            '<div class="seasonListRatingValue"></div> <i class="fa fa-heart" aria-hidden="true"></i> </div> </div>'),
        episodeListDivObj: $('<div class="episodeListDiv">' +
            '<div class="episodeListLeft">' +
            '<div class="episodeListNumber"></div>' +
            '<div class="episodeListDate"></div></div>' +
            '<div class="episodeListDetail">' +
            '<div class="episodeListName"></div> <div class="episodeListSynopsis"></div> </div> ' +
            '<div class="episodeListRating">' +
            '<div class="episodeListRatingValue"></div> <i class="fa fa-heart" aria-hidden="true"></i> </div> </div>'),
        castMemberDivObj: $('<div class="col-lg-3 col-md-4 col-sm-6"><div class="cast-member"><div class="row">' +
            '<div class="cast-image"> <img></div><div class="cast-details">' +
            '<div class="cast-name"></div> <div class="cast-role"></div></div></div> </div></div>'),
        watchItemDivObj: $('<div class="watch-item"><div class="watch-box"><img></div></div>'),
        movieInfoDivObj: $('<div class="movie-info-box row"> <div class="col-xs-4"> <div class="movie-info-label"></div>' +
            '</div> <div class="col-xs-8"> <div class="movie-info-value"></div> </div> </div>'),
        reviewDivObj: $('<div class="movie-review"> <div class="review-text"> </div>' +
            '<div class="review-source"><div class="review-source-person"> </div>' +
            '<div class="review-source-website"> </div></div> </div>'),
        downloadItemDivObj: $('<div class="download-item"> <div class="row"> <div class="download-file-icon"><img></div>' +
            '<div class="download-file-data"> <div class="download-file-name"></div> <div class="download-file-link"><a></a></div>' +
            '<div class="download-progress-detail"></div> <div class="download-progress-bar"><div class="download-complete-part"></div></div>' +
            '<div class="download-file-options"></div><div class="download-file-remove"></div> </div> </div> </div>')
    };
    function hideAllSection() {
        $(".search-wrapper").hide();
        $(".results-wrapper").hide();
        $(".trending-wrapper").hide();
        $(".movie-wrapper").hide();
        $(".serie-wrapper").hide();
        $(".downloads-wrapper").hide();
    }

    function clearAllData(except) {
        clearAllMovieData();
        clearAllTVData();
        clearSearchList();
        clearAllDownloadData();
    }

    function showHome() {
        bringe.page = "home";
        $("#search-input").val("");
        $("#search-input").focus();
        $(".search-wrapper").show();
        $(".trending-wrapper").show();
        $(".results-wrapper").show();
    }

    function hideTrending() {
        $(".trending-wrapper").hide();
    }

    function showDownloadSection() {
        $(".downloads-wrapper").show();
    }

    function showMoviePart() {
        bringe.page = "movie";
        $(".movie-wrapper").show();
    }

    function showSeriePart() {
        bringe.page = "serie";
        showActiveSerieLevel();
        $(".serie-wrapper").show();
    }

    function showActiveSerieLevel() {
        if (bringe.serieLevel === "serie") {
            showSerieLevel();
        } else if (bringe.serieLevel === "season") {
            showSeasonLevel();
        } else if (bringe.serieLevel === "episode") {
            showEpisodeLevel();
        }
    }

    function showSerieLevel() {
        bringe.page = "serie";
        bringe.serieLevel = "serie";
        $("#route-serie").html("");
        $("#route-season").html("");
        $("#route-episode").html("");
        $("#route-serie").hide();
        $("#route-season").hide();
        $("#route-episode").hide();
        $(".serie-wrapper").show();
        $(".season-level").hide();
        $(".episode-level").hide();
        $(".serie-level").show();
    }

    function showSeasonLevel() {
        bringe.page = "serie";
        bringe.serieLevel = "season";
        if (bringe.serie && bringe.serie.onlySeason) {
            $("#route-serie").html('');
            $("#route-serie").hide();
        } else {
            $("#route-serie").html(bringe.serie.title);
            $("#route-serie").show();
        }
        $("#route-season").html(bringe.season.title);
        $("#route-episode").html("");
        $("#route-episode").hide();
        $("#route-season").show();
        $("#route-episode").hide();
        $(".serie-wrapper").show();
        $(".serie-level").hide();
        $(".episode-level").hide();
        $(".season-level").show();
    }

    function showEpisodeLevel() {
        bringe.page = "serie";
        bringe.serieLevel = "episode";
        if (bringe.serie && bringe.serie.onlySeason) {
            $("#route-serie").html('');
            $("#route-serie").hide();
        } else {
            $("#route-serie").html(bringe.serie.title);
            $("#route-serie").show();
        }
        $("#route-season").html(bringe.season.title);
        $("#route-episode").html(bringe.episode.title);
        $("#route-season").show();
        $("#route-episode").show();
        $(".serie-wrapper").show();
        $(".serie-level").hide();
        $(".season-level").hide();
        $(".episode-level").show();
    }

    function goToHome() {
        hideAllSection();
        clearAllData();
        removeSearchResultText();
        showHome();
    }

    function setupDownloadSection() {
        hideAllSection();
        clearAllDownloadData();
        placeDownloadSection();
        showDownloadSection();
    }

    function goBackFromDownloads() {
        if (bringe.page == "home") {
            hideAllSection();
            showHome();
        } else if (bringe.page == "movie") {
            hideAllSection();
            showMoviePart();
        } else if (bringe.page == "serie") {
            hideAllSection();
            showSeriePart();
        }
    }

    function clearAllMovieData() {
        bringe.movie = {};
        var movieWrapper = $(".movie-wrapper");
        var movieDataSection = $(".movie-data-section");
        $(".movie-rating-box").hide();
        $("#movie-reviews-header").hide();
        $("#movie-social-header").hide();
        $("#movieStreamButton").hide();
        $("#movieTrailerButton").hide();
        $("#movieSubtitleButton").hide();
        movieWrapper.find(".cast-section").hide();
        movieWrapper.find(".watch-section").hide();
        movieWrapper.find(".synopsis-section").hide();
        movieWrapper.find(".movieInfo-section").hide();
        movieDataSection.hide();
        $(".movie-download-section").hide();
        movieWrapper.hide();
        movieWrapper.find(".cast-list").html("");
        movieWrapper.find("#movie-watch-list").html("");
        $("#movie-synopsis").html("");
        $("#movie-reviews").html("");
        $("#movieSocialList").html("");
        $("#movieInfoList").html("");
        $(".movie-poster").find("img").attr("src", "");
        $(".movieLoader").remove();
        movieDataSection.find(".movie-name").html("");
        movieDataSection.find(".movie-year").html("");
        movieDataSection.find(".movie-rating").html("");
    }

    function clearAllTVData() {
        $("#link-route").hide();
        clearAllSerieData();
        clearAllSeasonData();
        clearAllEpisodeData();
    }

    function clearAllSerieData() {
        bringe.serie = {};
        var wrapper = $(".serie-level");
        var serieDataSection = $(".serie-data-section");
        wrapper.find(".serie-rating-box").hide();
        wrapper.find(".cast-section").hide();
        wrapper.find(".seasons-section").hide();
        wrapper.find(".synopsis-section").hide();
        wrapper.find(".serie-data-section").hide();
        wrapper.find(".serieInfo-section").hide();
        wrapper.hide();
        wrapper.find(".cast-list").html("");
        wrapper.find(".seasons-list").html("");
        $("#serie-synopsis").html("");
        $("#serieInfoList").html("");
        $(".serie-poster").find("img").attr("src", "");
        $(".serieLoader").remove();
        serieDataSection.find(".serie-name").html("");
        serieDataSection.find(".serie-year").html("");
        serieDataSection.find(".serie-rating").html("");
    }

    function clearAllSeasonData() {
        bringe.season = null;
        var wrapper = $(".season-level");
        var serieDataSection = $(".season-data-section");
        wrapper.find(".season-rating-box").hide();
        wrapper.find(".cast-section").hide();
        wrapper.find(".episodes-section").hide();
        wrapper.find(".synopsis-section").hide();
        wrapper.find(".season-data-section").hide();
        wrapper.find(".seasonInfo-section").hide();
        wrapper.hide();
        wrapper.find(".cast-list").html("");
        wrapper.find(".episodes-list").html("");
        $("#season-synopsis").html("");
        $("#seasonInfoList").html("");
        $(".season-poster").find("img").attr("src", "");
        $(".seasonLoader").remove();
        serieDataSection.find(".season-name").html("");
        serieDataSection.find(".season-year").html("");
        serieDataSection.find(".season-rating").html("");
    }

    function clearAllEpisodeData() {
        bringe.episode = null;
        var wrapper = $(".episode-level");
        var serieDataSection = $(".episode-data-section");
        $("#episodeStreamButton").hide();
        $("#episodeTrailerButton").hide();
        $("#episodeSubtitleButton").hide();
        wrapper.find(".episode-rating-box").hide();
        wrapper.find(".cast-section").hide();
        wrapper.find(".synopsis-section").hide();
        wrapper.find(".episode-data-section").hide();
        wrapper.find("#episode-download-section").hide();
        wrapper.find(".episodeInfo-section").hide();
        wrapper.find(".episodeSynopsis-section").hide();
        wrapper.find(".watch-section").hide();
        wrapper.hide();
        wrapper.find(".cast-list").html("");
        $("#episode-synopsis").html("");
        $("#episodeInfoList").html("");
        $("#episode-watch-list").html("");
        $(".episode-poster").find("img").attr("src", "");
        $(".episodeLoader").remove();
        serieDataSection.find(".episode-name").html("");
        serieDataSection.find(".episode-year").html("");
        serieDataSection.find(".episode-rating").html("");
    }

    function clearAllDownloadData() {
        $("#download-list").html("");
    }

    function resetDownloadItemBox(downloadItemBox, id) {
        var downloads = _require(['downloads'])[0];
        downloads.getAndPlaceDownloadItemById(id, function (downloadItem) {
            if (downloadItem.exists) {
                var fileProgressBar = downloadItemBox.find(".download-progress-bar");
                var fileCompletePart = fileProgressBar.find(".download-complete-part");
                var fileProgressDetail = downloadItemBox.find(".download-progress-detail");
                var fileActionBox = downloadItemBox.find(".download-file-options");
                var fileRemoveBox = downloadItemBox.find(".download-file-remove");
                var detail = "";
                if (downloadItem.state == "in_progress") {
                    var last = fileProgressDetail.data("completed");
                    fileProgressDetail.data("completed", downloadItem.bytesReceived);
                    if (last && !downloadItem.paused) {
                        detail += downloads.getSizeInWords(downloadItem.bytesReceived - last) + "/s - ";
                    }
                    detail += downloads.getSizeInWords(downloadItem.bytesReceived) + " of " + downloads.getSizeInWords(downloadItem.totalBytes) + ", ";
                    if (downloadItem.paused) {
                        detail += "Paused ";
                    }
                    if (downloadItem.estimatedEndTime) {
                        var estimatedEndTime = new Date(downloadItem.estimatedEndTime);
                        var nowTime = new Date();
                        detail += util.getTimeInWords(estimatedEndTime.getTime() - nowTime.getTime()) + " left";
                    }
                    fileProgressDetail.html(detail);
                    var completePercentage = downloads.getCompletedPercentage(downloadItem.bytesReceived, downloadItem.totalBytes);
                    fileCompletePart.css("width", completePercentage + "%");
                    fileProgressBar.css("height", "3px");
                    if (downloadItem.paused == false && fileActionBox.find(".pause-button").length == 0) {
                        fileActionBox.html("");
                        fileActionBox.append(downloads.getPauseButton(downloadItem.id));
                        fileActionBox.append(downloads.getCancelButton(downloadItem.id));
                    } else if (downloadItem.paused && fileActionBox.find(".resume-button").length == 0) {
                        fileActionBox.html("");
                        fileActionBox.append(downloads.getResumeButton(downloadItem.id));
                        fileActionBox.append(downloads.getCancelButton(downloadItem.id));
                    }
                } else if (downloadItem.state == "interrupted" && fileActionBox.find(".retry-button").length == 0) {
                    fileActionBox.html("");
                    fileActionBox.append(downloads.getRetryButton(downloadItem));
                    fileProgressDetail.html("");
                    fileProgressBar.css("height", "0px");
                    fileRemoveBox.html("x");
                } else if (downloadItem.state == "complete" && fileActionBox.find(".open-button").length == 0) {
                    fileActionBox.html("");
                    fileProgressDetail.html("");
                    fileProgressBar.css("height", "0px");
                    fileActionBox.append(downloads.getOpenButton(downloadItem.id));
                    fileActionBox.append(downloads.getShowInFolderButton(downloadItem.id));
                    fileRemoveBox.html("x");
                }
                setTimeout(function () {
                    resetDownloadItemBox(downloadItemBox, id)
                }, 1000);
            } else {
                downloadItemBox.remove();
            }
        });
    }

    function placeDownloadSection() {
        $("#download-list").html("");
        bringe.downloadActive = true;
        chrome.downloads.search({filenameRegex: "Bringe", exists: true}, function (results) {
            var downloadList = [], i;
            for (i = 0; i < results.length; i++) {
                var item = results[i];
                if (item.byExtensionId == "npppfccdplcbhbcnbdgchlnbfhmemfja") {
                    downloadList.push(item);
                }
            }
            downloadList.sort(util.downloadComparator);
            var downloadListBox = $("#download-list");
            var downloads = _require(['downloads'])[0];
            for (i = 0; i < downloadList.length; i++) {
                downloads.getAndPlaceDownloadItemById(downloadList[i].id, function (downloadItem) {
                    var downloadItemBox = globalDivs.downloadItemDivObj.clone();
                    downloadItemBox.find(".download-file-name").html(util.extractFileName(downloadItem.filename));
                    var fileLinkBox = downloadItemBox.find(".download-file-link");
                    var fileIconBox = downloadItemBox.find(".download-file-icon");
                    var fileRemoveBox = downloadItemBox.find(".download-file-remove");
                    fileLinkBox.html(downloadItem.finalUrl);
                    fileLinkBox.data("href", downloadItem.finalUrl);
                    downloadListBox.append(downloadItemBox);
                    downloads.getAndPlaceDownloadItemIcon(downloadItem.id, fileIconBox, function (iconUrl, iconBox) {
                        iconBox.find("img").attr("src", iconUrl);
                    });
                    fileLinkBox.click(function (evt) {
                        var link = evt.target;
                        background.openLinkInBrowser($(link).data("href"));
                    });
                    fileRemoveBox.click(function () {
                        bringe.downloadActive = false;
                        chrome.downloads.erase({id: downloadItem.id}, function () {
                            placeDownloadSection();
                        });
                    });
                    resetDownloadItemBox(downloadItemBox, downloadItem.id);
                });
            }
        });
    }

    function showTrendingMovies(movies) {
        var trendingList = $("#trendingList"),
            trendingMovieDiv;
        util.each(movies, function (movie, i) {
            if (i < 15) {
                trendingMovieDiv = globalDivs.trendingMovieObj.clone();
                trendingMovieDiv.find('.tr-movie-img img').attr("src", movie.posters.primary);
                trendingMovieDiv.find('.tr-name').html(movie.title);
                trendingMovieDiv.find('.tr-rate').html(movie.tomatoScore);
                trendingMovieDiv.attr("data-index", i);
                trendingMovieDiv.click(function () {
                    var box = $(this);
                    util.fireEvent("getTrendingMovies", [box.attr("data-index")]);
                });
                trendingList.append(trendingMovieDiv);
            }
        });
    }

    function placeMoviesList(movies) {
        var movie, i,
            resultOptionBar = $(".resultOptionBar"),
            moviesResultsList = $("#moviesResultsList");
        moviesResultsList.html("");
        resultOptionBar.find('#moviesResultsButton').show();
        for (i = 0; i < movies.length; i++) {
            movie = movies[i];
            if (!movie.meterScore) {
                continue;
            }
            var searchMovieDiv = globalDivs.searchMovieDivObj.clone();
            searchMovieDiv.attr("id", "movieIndex_" + i);
            if (movie.image) {
                movie.image = movie.image.replace("https", "http");
                searchMovieDiv.find(".searchMovieImage").find("img").attr("src", movie.image);
            }
            if (movie.name) {
                if (movie.year) {
                    searchMovieDiv.find(".searchMovieName").html(movie.name + " (" + movie.year + ")");
                } else {
                    searchMovieDiv.find(".searchMovieName").html(movie.name);
                }
            }
            if (movie.subline) {
                searchMovieDiv.find(".searchMovieSubline").html(movie.subline);
            }
            if (movie.meterScore) {
                searchMovieDiv.find(".searchMovieRatingValue").html(movie.meterScore);
            } else {
                searchMovieDiv.find(".searchMovieRating").remove();
            }
            moviesResultsList.append(searchMovieDiv);
        }
        $(".searchMovie").click(function (e) {
            var movieId = $(this).attr("id");
            var movieIndex = movieId.split("_")[1];
            util.fireEvent("getMovie", [movieIndex]);
        });
    }

    function placeSeriesList(series) {
        var serie, i,
            resultOptionBar = $(".resultOptionBar"),
            seriesResultsList = $("#seriesResultsList");
        seriesResultsList.html("");
        resultOptionBar.find('#seriesResultsButton').show();
        for (i = 0; i < series.length; i++) {
            serie = series[i];
            var searchSerieDiv = globalDivs.searchSerieDivObj.clone();
            searchSerieDiv.attr("id", "serieIndex_" + i);
            if (serie.image) {
                serie.image = serie.image.replace("https", "http");
                searchSerieDiv.find(".searchSerieImage").find("img").attr("src", serie.image);
            }
            if (serie.title) {
                searchSerieDiv.find(".searchSerieName").html(serie.title);
            }
            if (serie.startYear) {
                var yearPart = serie.startYear;
                if (serie.endYear) {
                    yearPart += " - " + serie.endYear;
                }
                serie.year = yearPart;
                searchSerieDiv.find(".searchSerieYear").html('(' + yearPart + ')');
            }
            if (serie.meterScore) {
                searchSerieDiv.find(".searchSerieRatingValue").html(serie.meterScore);
            } else {
                searchSerieDiv.find(".searchSerieRating").remove();
            }
            seriesResultsList.append(searchSerieDiv);
        }
        $(".searchSerie").click(function (e) {
            var serieId = $(this).attr("id");
            var serieIndex = serieId.split("_")[1];
            util.fireEvent("getSerie", [serieIndex]);
        });
    }

    function setMovieListVisible() {
        $("#seriesResultsButton").removeClass("activeTab");
        $("#moviesResultsButton").addClass("activeTab");
        $("#seriesResultsList").hide();
        $("#moviesResultsList").show();
    }
    function setSerieListVisible() {
        $("#moviesResultsButton").removeClass("activeTab");
        $("#seriesResultsButton").addClass("activeTab");
        $("#moviesResultsList").hide();
        $("#seriesResultsList").show();
    }

    function showMovieStreamLink() {
        $("#movieStreamButton").show();
        $(".movieLoader").remove();
    }

    function showMovieTrailerLink() {
        $("#movieTrailerButton").show();
    }

    function showEpisodeTrailerLink() {
        $("#episodeTrailerButton").show();
    }

    function showEpisodeStreamLink() {
        $("#episodeStreamButton").show();
    }

    function clearSearchList() {
        bringe.searchResults.movies = null;
        bringe.searchResults.series = null;
        $(".searchResultList").html("");
        $(".searchResultList").hide();
        $('.resultOptionButton').hide();
        $(".resultOptionButton").removeClass("activeTab");
    }

    function showRTMovie() {
        var wrapper = $(".movie-wrapper"),
            infoList,
            thisMovie = bringe.movie;
        removeRottenLoader();
        var castList = wrapper.find(".cast-list"),
            movieDataSection = $(".movie-data-section"),
            i;
        for (i = 0; i < thisMovie.cast.length; i++) {
            var person = thisMovie.cast[i];
            var castMemberDiv = globalDivs.castMemberDivObj.clone();
            castMemberDiv.find("img").attr("src", person.image);
            castMemberDiv.find(".cast-name").html(person.name);
            castMemberDiv.find(".cast-role").html(person.role);
            castList.append(castMemberDiv);
        }
        if (thisMovie.cast.length) {
            wrapper.find(".cast-section").show();
            castList.find(".cast-member").click(function (evt) {
                var obj = $(this);
                var name = obj.find(".cast-name").html();
                util.fireEvent("searchOnGoogle", [name]);
            });
        } else {
            wrapper.find(".cast-section").hide();
        }
        $("#movie-synopsis").html(thisMovie.synopsis);
        infoList = $("#movieInfoList");
        wrapper.find(".synopsis-section").show();
        var infos = thisMovie.infoList;
        for (i = 0; i < infos.length; i++) {
            var serieInfoDiv = globalDivs.movieInfoDivObj.clone();
            serieInfoDiv.find(".movie-info-label").html(infos[i].label);
            serieInfoDiv.find(".movie-info-value").html(infos[i].value);
            infoList.append(serieInfoDiv);
        }
        if (thisMovie.images && thisMovie.images.thumbnail || thisMovie.images.coverImage) {
            if (thisMovie.images.image) {
                $(".movie-poster").find("img").attr("src", thisMovie.images.image);
            } else {
                $(".movie-poster").find("img").attr("src", thisMovie.images.thumbnail);
            }
        }
        movieDataSection.find(".movie-name").html(thisMovie.title);
        movieDataSection.find(".movie-year").html('(' + thisMovie.year + ')');
        if (thisMovie.ratings && thisMovie.ratings.meterScore) {
            $("#movie-rotten-rating").html(thisMovie.ratings.meterScore + "%");
            $("#rotten-movie-rating-box").show();
        }
        if (thisMovie.ratings && thisMovie.ratings.audienceScore) {
            $(".movie-data-section").find("#movie-audience-rating").html(thisMovie.ratings.audienceScore);
            $("#audience-movie-rating-box").show();
        }
        $(".movieInfo-section").show();
        movieDataSection.show();
        $(".movie-download-section").show();
        $(".synopsis-section").show();
    }

    function showRTSerie() {
        var wrapper = $(".serie-level"),
            watching = bringe.serie,
            infoList,
            dataSection = $(".serie-data-section"),
            thisSerie = bringe.serie;
        removeRottenLoader();
        $("#link-route").show();

        dataSection.find(".serie-name").html(thisSerie.title);
        var year = thisSerie.startYear;
        if (thisSerie.endYear) {
            year += ' - ' + thisSerie.endYear;
        }
        var image = thisSerie.image || thisSerie.thumbnail;
        $(".serie-poster").find("img").attr("src", image);
        dataSection.find(".serie-year").html('(' + year + ')');
        if (thisSerie.ratings.rotten) {
            $("#serie-rotten-rating").html(thisSerie.ratings.rotten + "%");
            $("#rotten-serie-rating-box").show();
        } else {
            $("#serie-rotten-rating").html("");
            $("#rotten-serie-rating-box").hide();
        }
        if (thisSerie.ratings.audienceScore) {
            $("#serie-audience-rating").html(thisSerie.ratings.audienceScore);
            $("#audience-serie-rating-box").show();
        } else {
            $("#serie-rotten-rating").html("");
            $("#rotten-serie-rating-box").hide();
        }
        var castList = wrapper.find(".cast-list"),
            i;
        for (i = 0; i < watching.cast.length; i++) {
            var person = watching.cast[i];
            var castMemberDiv = globalDivs.castMemberDivObj.clone();
            castMemberDiv.find("img").attr("src", person.image);
            castMemberDiv.find(".cast-name").html(person.name);
            castMemberDiv.find(".cast-role").html(person.role);
            castList.append(castMemberDiv);
        }
        if (watching.cast.length) {
            wrapper.find(".cast-section").show();
            wrapper.find(".cast-section").show();
            castList.find(".cast-member").click(function (evt) {
                var obj = $(this);
                var name = obj.find(".cast-name").html();
                util.fireEvent("searchOnGoogle", [name]);
            });
        } else {
            wrapper.find(".cast-section").hide();
        }
        $("#serie-synopsis").html(watching.synopsis);
        infoList = $("#serieInfoList");
        wrapper.find(".synopsis-section").show();
        var infos = watching.infoList;
        for (i = 0; i < infos.length; i++) {
            var serieInfoDiv = globalDivs.movieInfoDivObj.clone();
            serieInfoDiv.find(".movie-info-label").html(infos[i].label);
            serieInfoDiv.find(".movie-info-value").html(infos[i].value);
            infoList.append(serieInfoDiv);
        }
        dataSection.show();
        $(".serieInfo-section").show();
        var seasonsList = wrapper.find(".seasons-list");
        for (i = watching.seasons.length - 1; i >= 0; i--) {
            var season = watching.seasons[i];
            var seasonListDiv = globalDivs.seasonListDivObj.clone();
            seasonListDiv.attr("id", "season_" + i);
            seasonListDiv.find(".seasonListImage").find("img").attr("src", season.image);
            seasonListDiv.find(".seasonListName").html(season.title);
            seasonListDiv.find(".seasonListConsensus").html(season.consensus);
            seasonListDiv.find(".seasonListInfo").html(season.info);
            if (season.ratings && season.ratings.rotten) {
                seasonListDiv.find(".seasonListRatingValue").html(season.ratings.rotten.slice(0, -1));
            } else {
                seasonListDiv.find(".seasonListRating").hide();
            }
            seasonsList.append(seasonListDiv);
        }
        $(".seasonListDiv").click(function (e) {
            var seasonId = $(this).attr("id");
            var seasonIndex = seasonId.split("_")[1];
            util.fireEvent("getSeason", [seasonIndex]);
        });
        wrapper.find(".seasons-section").show();
    }

    function showRTSeasonData() {
        var wrapper = $(".season-level"),
            thisSeason = bringe.season,
            watching = thisSeason,
            infoList,
            castList = wrapper.find(".cast-list"),
            dataSection = $(".season-data-section"),
            i;
        removeRottenLoader();
        $("#link-route").show();
        $(".season-poster").find("img").attr("src", thisSeason.image);
        dataSection.find(".season-name").html(thisSeason.title);
        if (thisSeason.info) {
            dataSection.find(".season-year").html('(' + thisSeason.info + ')');
        } else {
            dataSection.find(".season-year").html('');
        }
        if (thisSeason.ratings && thisSeason.ratings.rotten) {
            $("#season-rotten-rating").html(thisSeason.ratings.rotten);
            $("#rotten-season-rating-box").show();
        } else {
            $("#season-rotten-rating").html("");
            $("#rotten-season-rating-box").hide();
        }
        if (thisSeason.ratings && thisSeason.ratings.audienceScore) {
            $("#season-audience-rating").html(thisSeason.ratings.audienceScore);
            $("#audience-season-rating-box").show();
        } else {
            $("#season-audience-rating").html("");
            $("#audience-season-rating-box").hide();
        }
        for (i = 0; i < watching.cast.length; i++) {
            var person = watching.cast[i];
            var castMemberDiv = globalDivs.castMemberDivObj.clone();
            castMemberDiv.find("img").attr("src", person.image);
            castMemberDiv.find(".cast-name").html(person.name);
            castMemberDiv.find(".cast-role").html(person.role);
            castList.append(castMemberDiv);
        }
        if (watching.cast.length) {
            wrapper.find(".cast-section").show();
            wrapper.find(".cast-section").show();
            castList.find(".cast-member").click(function (evt) {
                var obj = $(this);
                var name = obj.find(".cast-name").html();
                util.fireEvent("searchOnGoogle", [name]);
            });
        } else {
            wrapper.find(".cast-section").hide();
        }
        $("#season-synopsis").html(watching.synopsis);
        infoList = $("#seasonInfoList");
        wrapper.find(".synopsis-section").show();
        var infos = watching.infoList;
        for (i = 0; i < infos.length; i++) {
            var serieInfoDiv = globalDivs.movieInfoDivObj.clone();
            serieInfoDiv.find(".movie-info-label").html(infos[i].label);
            serieInfoDiv.find(".movie-info-value").html(infos[i].value);
            infoList.append(serieInfoDiv);
        }
        dataSection.show();
        $(".seasonInfo-section").show();
    }

    function showRTEpisodesList() {
        var wrapper = $(".season-level"),
            watching = bringe.season,
            episodesList = wrapper.find(".episodes-list");
        for (var i = 0; i < watching.episodes.length; i++) {
            var episode = watching.episodes[i];
            var episodeListDiv = globalDivs.episodeListDivObj.clone();
            episodeListDiv.attr("id", "episode_" + i);
            episodeListDiv.find(".episodeListName").html(episode.title);
            episodeListDiv.find(".episodeListNumber").html(episode.episodeNo);
            episodeListDiv.find(".episodeListDate").html(episode.date);
            episodeListDiv.find(".episodeListSynopsis").html(episode.synopsis);
            if (episode.ratings && episode.ratings.rotten) {
                episodeListDiv.find(".episodeListRatingValue").html(episode.ratings.rotten);
            } else {
                episodeListDiv.find(".episodeListRating").hide();
            }
            episodesList.append(episodeListDiv);
        }
        $(".episodeListDiv").click(function (e) {
            var episodeId = $(this).attr("id");
            var episodeIndex = episodeId.split("_")[1];
            util.fireEvent("getEpisode", [episodeIndex]);
        });
        wrapper.find(".episodes-section").show();
    }

    function showRTEpisodeData() {
        var wrapper = $(".episode-level"),
            thisEpisode = bringe.episode,
            watching = thisEpisode,
            infoList,
            castList = wrapper.find(".cast-list"),
            dataSection = $(".episode-data-section"),
            i;
        removeRottenLoader();
        $("#link-route").show();
        $(".episode-poster img").attr("src", watching.image);
        dataSection.find(".episode-name").html(thisEpisode.title);
        if (thisEpisode.date) {
            dataSection.find(".episode-year").html('(' + thisEpisode.date + ')');
        }
        if (thisEpisode.ratings && thisEpisode.ratings.rotten) {
            $("#episode-rotten-rating").html(thisEpisode.ratings.rotten + "%");
            $("#rotten-episode-rating-box").show();
        } else {
            $("#episode-rotten-rating").html("");
            $("#rotten-episode-rating-box").hide();
        }
        if (thisEpisode.ratings && thisEpisode.ratings.audienceScore) {
            $("#episode-audience-rating").html(thisEpisode.ratings.audienceScore);
            $("#audience-episode-rating-box").show();
        } else {
            $("#episode-audience-rating").html("");
            $("#audience-episode-rating-box").hide();
        }
        if (thisEpisode.ratings.imdb) {
            $("#episode-imdb-rating").html(thisEpisode.ratings.imdb);
            $("#imdb-episode-rating-box").show();
        } else {
            $("#episode-imdb-rating").html("");
            $("#imdb-episode-rating-box").hide();
        }
        for (i = 0; i < watching.cast.length; i++) {
            var person = watching.cast[i];
            var castMemberDiv = globalDivs.castMemberDivObj.clone();
            castMemberDiv.find("img").attr("src", person.image);
            castMemberDiv.find(".cast-name").html(person.name);
            castMemberDiv.find(".cast-role").html(person.role);
            castList.append(castMemberDiv);
        }
        if (watching.cast.length) {
            wrapper.find(".cast-section").show();
            wrapper.find(".cast-section").show();
            castList.find(".cast-member").click(function (evt) {
                var obj = $(this);
                var name = obj.find(".cast-name").html();
                util.fireEvent("searchOnGoogle", [name]);
            });
        } else {
            wrapper.find(".cast-section").hide();
        }
        $("#episode-synopsis").html(watching.synopsis);
        infoList = $("#episodeInfoList");
        wrapper.find(".synopsis-section").show();
        var infos = watching.infoList;
        for (i = 0; i < infos.length; i++) {
            var serieInfoDiv = globalDivs.movieInfoDivObj.clone();
            serieInfoDiv.find(".movie-info-label").html(infos[i].label);
            serieInfoDiv.find(".movie-info-value").html(infos[i].value);
            infoList.append(serieInfoDiv);
        }
        dataSection.show();
        $("#episode-download-section").show();
        $(".episodeInfo-section").show();
        $(".episodeSynopsis-section").show();
        showExternalEpisodeStreaming();
    }

    function placeImdbMovieRating() {
        if (bringe.movie.ratings && bringe.movie.ratings.imdbRating) {
            $("#movie-imdb-rating").html(bringe.movie.ratings.imdbRating);
            $("#imdb-movie-rating-box").show();
        }
        if (bringe.movie.ratings && bringe.movie.ratings.metaRating) {
            $("#movie-metacritic-rating").html(bringe.movie.ratings.metaRating);
            $("#metacritic-movie-rating-box").show();
        }
    }

    function placeImdbSerieRating() {
        if (bringe.serie.ratings.imdbRating) {
            $("#serie-imdb-rating").html(bringe.serie.ratings.imdbRating);
            $("#imdb-serie-rating-box").show();
        }
        if (bringe.serie.ratings.metaRating) {
            $("#serie-metacritic-rating").html(bringe.serie.ratings.metaRating);
            $("#metacritic-serie-rating-box").show();
        }
    }

    function placeGoogleMovieData() {
        if (bringe.movie.reviews) {
            $("#movie-reviews-header").show();
            var reviewsDiv = $("#movie-reviews");
            util.each(bringe.movie.reviews, function (review) {
                var reviewDiv = globalDivs.reviewDivObj.clone();
                reviewDiv.find(".review-text").html(review.text);
                if (review.source.name) {
                    reviewDiv.find(".review-source-person").html("-" + review.source.name);
                }
                if (review.source.sourceSite) {
                    reviewDiv.find(".review-source-website").html('(' + review.source.sourceSite + ')');
                }
                reviewsDiv.append(reviewDiv);
            });
        }
        if (bringe.movie.social) {
            $("#movie-social-header").show();
            var socialList = $("#movieSocialList");
            util.each(bringe.movie.social, function(social) {
                var socialDiv = $('<div class="socialBox"><div class="socialImg"><i class="fa fa-fw" aria-hidden="true"></i></div>');
                socialDiv.attr("data-href", social.link);
                socialDiv.find("i").addClass(iconMap[social.site]);
                socialList.append(socialDiv);
                socialDiv.click(function (evt) {
                    background.openLinkInBrowser(this.getAttribute("data-href"));
                });
            });
        }
    }

    function showExternalMovieStreaming() {
        var extStreams = bringe.movie && bringe.movie.externalStreams;
        if (extStreams && extStreams.length > 0) {
            $(".movie-wrapper .watch-section").show();
            var list = $("#movie-watch-list");
            for (var i = 0; i < extStreams.length; i++) {
                var stream = extStreams[i];
                var watchItem = globalDivs.watchItemDivObj.clone();
                watchItem.find("img").attr("src", stream.image);
                watchItem.find(".watch-box").attr("data-href", stream.link);
                list.append(watchItem);
            }
            list.find(".watch-box").click(function () {
                background.openLinkInBrowser(this.getAttribute("data-href"));
            });
        }
    }

    function showExternalEpisodeStreaming() {
        var websites = bringe.serie && bringe.serie.websites,
            seasonNo = bringe.season.seasonNo;
        if (websites && websites.watchit && websites.watchit.seasons && websites.watchit.seasons[seasonNo + ''] && websites.watchit.seasons[seasonNo + ''].externalStreams && websites.watchit.seasons[seasonNo + ''].externalStreams.length > 0) {
            var externalStreams = websites.watchit.seasons[seasonNo + ''].externalStreams;
            $(".serie-wrapper .watch-section").show();
            var list = $("#episode-watch-list");
            for (var i = 0; i < externalStreams.length; i++) {
                var stream = externalStreams[i];
                var watchItem = globalDivs.watchItemDivObj.clone();
                watchItem.find("img").attr("src", stream.image);
                watchItem.find(".watch-box").attr("data-href", stream.link);
                list.append(watchItem);
            }
            list.find(".watch-box").click(function () {
                background.openLinkInBrowser(this.getAttribute("data-href"));
            });
        }
    }

    function showSubtitleLink() {
        $("#movieSubtitleButton").show();
    }

    function showEpisodeSubtitleLink() {
        $("#episodeSubtitleButton").show();
    }

    function clearPopup() {
        var popupBox = $(".popup-box");
        var table = popupBox.find("table");
        popupBox.find(".popup-header").html("");
        table.find("thead").html("");
        table.find("tbody").html("");
    }

    function openPopup() {
        $(".popup-wrapper").show();
        $("body").addClass("stop-scrolling");
    }

    function closePopup() {
        $(".popup-wrapper").hide();
        $("body").removeClass("stop-scrolling");
        clearPopup();
    }

    function openWaiter(text) {
        $(".waiter-text").find("p").html(text);
        $(".waiter-wrapper").show();
        $("body").addClass("stop-scrolling");
    }

    function closeWaiter() {
        $(".waiter-wrapper").hide();
        $(".waiter-text").find("p").html("");
        $("body").removeClass("stop-scrolling");
    }

    function showRottenLoader(obj) {
        $('.rotten-buffer').remove();
        var buffer = $('<div class="rotten-buffer"><img class="fa-spin" src="../images/bringe-48.png"></div>');
        obj.append(buffer);
    }

    function removeRottenLoader() {
        $('.rotten-buffer').remove();
    }

    function openEpisodesStreamPopup(streamLinks) {
        clearPopup();
        var popupBox = $(".popup-box");
        popupBox.find(".popup-header").html("Episode Links");
        var table = popupBox.find("table");
        var thead = table.find("thead");
        //thead.append('<tr> <td>Source</td> <td>Quality</td> <td>Format</td> </tr>');
        var tbody = table.find("tbody");
        for (var i = 0; i < streamLinks.length; i++) {
            var link = streamLinks[i];
            var row = $('<tr data-id="' + link.source + '"> <td data-id="' + link.id + '">Server ' + (i+1) + '</td> <td class="streamQuality">' + link.label + '</td> <td class="streamEpisode">Stream Episode</td> <td class="downloadEpisode">Download</td> </tr>');
            tbody.append(row);
            var downloadButton = row.find(".downloadEpisode");
            var streamButton = row.find(".streamEpisode");
            downloadButton.click(function (evt) {
                closePopup();
                var obj = $(this),
                    line = obj.parent(),
                    source = line.attr("data-id"),
                    tds = line.find("td"),
                    id = $(tds[0]).attr("data-id");
                util.fireEvent("downloadSerieStream", [{id: id, source: source}]);
            });
            streamButton.click(function (evt) {
                closePopup();
                var obj = $(this),
                    line = obj.parent(),
                    source = line.attr("data-id"),
                    tds = line.find("td"),
                    id = $(tds[0]).attr("data-id");
                util.fireEvent("openSerieStream", [{id: id, source: source}]);
            });
        }
        openPopup();
    }

    function openMovieStreamPopup(movie) {
        clearPopup();
        var popupBox = $(".popup-box");
        popupBox.find(".popup-header").html("Stream Movie");
        var table = popupBox.find("table");
        var thead = table.find("thead");
        //thead.append('<tr> <td>Source</td> <td>Quality</td> <td>Format</td> </tr>');
        var tbody = table.find("tbody");
        var linksObj = movie.streamLinkDetails;
        for (var i = 0; i < linksObj.length; i++) {
            var linkObj = linksObj[i];
            var ext = linkObj.type;
            var serverId = linkObj.id.split("*")[0];
            var row = $('<tr class="' + linkObj.id + '"> <td>#' + serverId + '</td> <td>' + linkObj.label + '</td> <td class="movieStream">Stream</td> <td class="movieDownload">Download</td> </tr>');
            tbody.append(row);
            var stream = row.find(".movieStream");
            var download = row.find(".movieDownload");
            stream.click(function (evt) {
                closePopup();
                var obj = $(this).parent(),
                    id = obj.attr("class"),
                    tds = obj.find("td"),
                    label = $(tds[1]).html();
                util.fireEvent("openMovieStream", [{id: id, label: label}]);
            });
            download.click(function (evt) {
                closePopup();
                var obj = $(this).parent(),
                    id = obj.attr("class"),
                    tds = obj.find("td"),
                    label = $(tds[1]).html();
                util.fireEvent("downloadMovieStream", [{id: id, label: label}]);
            });
        }
        openPopup();
    }

    function openMovieSubtitlePopup(movie) {
        clearPopup();
        var popupBox = $(".popup-box");
        popupBox.find(".popup-header").html("Download Subtitle");
        var table = popupBox.find("table");
        var thead = table.find("thead");
        thead.append('<tr> <td>Source</td> <td>Rating</td> <td>Format</td> </tr>');
        var tbody = table.find("tbody");
        var linksObj = movie.subtitleLinks;
        for (var i = 0; i < linksObj.length; i++) {
            var linkObj = linksObj[i];
            var ext = "srt";
            var row = $('<tr class="' + linkObj.index + '"> <td><img src="../images/subscene.gif"/></td> <td>' + linkObj.rating + '</td> <td>' + ext + '</td> </tr>');
            tbody.append(row);
            row.click(function (evt) {
                closePopup();
                var obj = $(this);
                var id = obj.attr("class");
                util.fireEvent("downloadMovieSubtitle", [parseInt(id)]);
            });
        }
        openPopup();
    }

    function openEpisodeSubtitlePopup(episode) {
        clearPopup();
        var popupBox = $(".popup-box");
        popupBox.find(".popup-header").html("Download Subtitle");
        var table = popupBox.find("table");
        var thead = table.find("thead");
        thead.append('<tr> <td>Source</td> <td>Rating</td> <td>Format</td> </tr>');
        var tbody = table.find("tbody");
        var linksObj = episode.links;
        if (linksObj) {
            for (var i = 0; i < linksObj.length; i++) {
                var linkObj = linksObj[i];
                var ext = "srt";
                var row = $('<tr class="' + linkObj.index + '"> <td><img src="../images/subscene.gif"/></td> <td>' + linkObj.rating + '</td> <td>' + ext + '</td> </tr>');
                tbody.append(row);
                row.click(function (evt) {
                    closePopup();
                    var obj = $(this);
                    var id = obj.attr("class");
                    util.fireEvent("downloadEpisodeSubtitle", [parseInt(id)]);
                });
            }
            openPopup();
        }
    }

    function openVideoPopup() {
        $(".video-wrapper").show();
    }
    function closeVideoPopup() {
        $(".video-wrapper").hide();
    }
    function openTrailerPopup() {
        $(".youtube-wrapper").show();
    }
    function closeTrailerPopup() {
        $(".youtube-wrapper").hide();
    }

    function shineDownloadButton() {
        $("#downloads-button").addClass("shine");
        setTimeout(function () {
            $("#downloads-button").removeClass("shine");
        }, 500);
    }

    function searching() {
        removeSearchBuffer();
        removeSearchResultText();
        var buffer = $('<div class="search-buffer"><img class="fa-spin" src="../images/bringe-48.png"></div>');
        $(".search-result-wrapper").append(buffer);
    }

    function removeSearchBuffer() {
        $(".search-result-wrapper").find(".search-buffer").remove();
    }

    function showSearchResultText(text) {
        removeSearchResultText();
        var status = $('<div class="search-result-text">' + text + '</div>');
        $(".search-result-wrapper").append(status);
    }

    function removeSearchResultText() {
        $(".search-result-wrapper").find(".search-result-text").remove();
    }

    function findingMovieLink() {
        var loader = $('<div class="movieLoader"><i class="fa fa-spinner fa-spin"></i></div>');
        $(".movieActionButtons").append(loader);
    }

    function couldnotFetchMovieLink() {
        $(".movieLoader").remove();
    }

    function movieLoadComplete() {
        $(".movieLoader").remove();
    }

    return {
        hideAllSection: hideAllSection,
        goToHome: goToHome,
        hideTrending: hideTrending,
        showTrendingMovies: showTrendingMovies,
        placeMoviesList: placeMoviesList,
        placeSeriesList: placeSeriesList,
        setMovieListVisible: setMovieListVisible,
        setSerieListVisible: setSerieListVisible,
        placeDownloadSection: placeDownloadSection,
        showMovieStreamLink: showMovieStreamLink,
        showEpisodeStreamLink: showEpisodeStreamLink,
        showMovieTrailerLink: showMovieTrailerLink,
        showEpisodeTrailerLink: showEpisodeTrailerLink,
        clearSearchList: clearSearchList,
        showRTMovie: showRTMovie,
        showRTSerie: showRTSerie,
        showRTSeasonData: showRTSeasonData,
        showRTEpisodeData: showRTEpisodeData,
        showRTEpisodesList: showRTEpisodesList,
        showMoviePart: showMoviePart,
        showSeriePart: showSeriePart,
        showSerieLevel: showSerieLevel,
        showSeasonLevel: showSeasonLevel,
        showEpisodeLevel: showEpisodeLevel,
        clearAllSerieData: clearAllSerieData,
        clearAllSeasonData: clearAllSeasonData,
        clearAllEpisodeData: clearAllEpisodeData,
        placeImdbMovieRating: placeImdbMovieRating,
        placeImdbSerieRating: placeImdbSerieRating,
        placeGoogleMovieData: placeGoogleMovieData,
        showExternalMovieStreaming: showExternalMovieStreaming,
        showExternalEpisodeStreaming: showExternalEpisodeStreaming,
        showSubtitleLink: showSubtitleLink,
        showEpisodeSubtitleLink: showEpisodeSubtitleLink,
        goBackFromDownloads: goBackFromDownloads,
        setupDownloadSection: setupDownloadSection,
        closePopup: closePopup,
        openWaiter: openWaiter,
        closeWaiter: closeWaiter,
        showRottenLoader: showRottenLoader,
        removeRottenLoader: removeRottenLoader,
        openMovieStreamPopup: openMovieStreamPopup,
        openMovieSubtitlePopup: openMovieSubtitlePopup,
        openEpisodesStreamPopup: openEpisodesStreamPopup,
        openEpisodesSubtitlePopup: openEpisodeSubtitlePopup,
        openVideoPopup: openVideoPopup,
        closeVideoPopup: closeVideoPopup,
        openTrailerPopup: openTrailerPopup,
        closeTrailerPopup: closeTrailerPopup,
        shineDownloadButton: shineDownloadButton,
        showSearchResultText: showSearchResultText,
        searching: searching,
        removeSearchBuffer: removeSearchBuffer,
        findingMovieLink: findingMovieLink,
        couldnotFetchMovieLink: couldnotFetchMovieLink,
        movieLoadComplete: movieLoadComplete
    }
});




_define('subscene', [window, 'util', 'bringe'], function (window, util, bringe) {
    function getSeasonPart() {
        var seasonNo = bringe.serie.seasonNo,
            seasonPart = 's';
        if (seasonNo) {
            if (seasonNo > 9) {
                return seasonPart + seasonNo;
            } else {
                return seasonPart + '0' + seasonNo;
            }
        }
        return '';
    }

    function getEpisodePart() {
        var episodeNo = bringe.serie.episodeNo,
            episodePart = 'e';
        if (episodeNo) {
            if (episodeNo > 9) {
                return episodePart + episodeNo;
            } else {
                return episodePart + '0' + episodeNo;
            }
        }
        return '';
    }

    function getSubsceneLinks(links) {
        var list = [];
        if (bringe.page != "movie" && bringe.page != "serie") return list;
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.match(/https?:\/\/subscene\.com\/subtitles\/.+\/english\/\d+$/)) {
                list.push(links[i].href);
            }
        }
        return list;
    }

    function searchSubtitle(func) {
        var link,
            thisMovie = bringe.movie,
            thisSerie = bringe.serie;
        if (bringe.page == "movie") {
            link = "https://www.google.com/search?q=" + thisMovie.name + "+" + thisMovie.year + "+english+-arabic+site:subscene.com/subtitles";
        } else if (bringe.page == "serie") {
            link = "https://www.google.com/search?q=" + thisSerie.title + "+" + getSeasonPart() + getEpisodePart() + "+english+-arabic+site:subscene.com/subtitles";
            var episode = getSubtitleEpisode();
            if (episode) {
                delete episode.links;
            }
        } else {
            return;
        }
        $.ajax({
            url: link,
            success: function (result) {
                var parser = new DOMParser(),
                    doc = parser.parseFromString(result, "text/html"),
                    myDoc = $(doc);
                var links = myDoc.find("a[onmousedown]");
                var subsceneLinks = getSubsceneLinks(links);
                for (var i = 0; i < subsceneLinks.length; i++) {
                    getSubtitleDownloadLink(subsceneLinks[i], func);
                }
            },
            error: function () {
                func(false);
            }
        });
    }

    function getSubtitleSeason() {
        var reqdSeason = null,
            seasons,
            thisSerie = bringe.serie;
        if (thisSerie.subtitles) {
            seasons = thisSerie.subtitles.seasons;
            util.each(seasons, function (season) {
                if (season.seasonNo == thisSerie.seasonNo) {
                    reqdSeason = season;
                }
            });
        }
        return reqdSeason;
    }

    function getSubtitleEpisode() {
        var reqdEpisode = null;
        var season = getSubtitleSeason();
        if (season) {
            var episodes = season.episodes || [];
            util.each(episodes, function (episode) {
                if (episode.episodeNo == bringe.serie.episodeNo) {
                    reqdEpisode = episode;
                }
            });
        }
        return reqdEpisode;
    }

    function getSubtitleDownloadLink(subsenelink, func) {
        if (bringe.page != "movie" && bringe.page != "serie") return;
        $.ajax({
            url: subsenelink,
            success: function (result) {
                if (bringe.page != "movie" && bringe.page != "serie") return;
                var parser = new DOMParser(),
                    doc = parser.parseFromString(result, "text/html"),
                    myDoc = $(doc),
                    button = myDoc.find("#downloadButton"),
                    ratingBox = myDoc.find(".rating"),
                    rating = "-";
                if (button.length > 0) {
                    var link = "https://subscene.com" + button.attr("href");
                    if (ratingBox.length > 0) {
                        ratingBox = ratingBox.find("span");
                        if (ratingBox.length > 0)
                            rating = ratingBox.html();
                    }
                    if (bringe.page == "movie") {
                        var thisMovie = bringe.movie;
                        thisMovie.subtitleLinks = thisMovie.subtitleLinks || [];
                        var len = thisMovie.subtitleLinks.length;
                        thisMovie.subtitleLinks.push({link: link, rating: rating, index: len});
                        if (len == 0) {
                            func(true);
                        }
                    } else {
                        var thisSerie = bringe.serie;
                        thisSerie.subtitles = thisSerie.subtitles || {};
                        thisSerie.subtitles.seasons = thisSerie.subtitles.seasons || [];
                        var season = getSubtitleSeason();
                        if (!season) {
                            season = {seasonNo: thisSerie.seasonNo};
                            thisSerie.subtitles.seasons.push(season);
                        }
                        season.episodes = season.episodes || [];
                        var episode = getSubtitleEpisode();
                        if (!episode) {
                            episode = {episodeNo: thisSerie.episodeNo, links: [{link: link, rating: rating, index: 0}]};
                            season.episodes.push(episode);
                            func(true);
                        } else {
                            episode.links = episode.links || [];
                            len = episode.links.length;
                            episode.links.push({link: link, rating: rating, index: len});
                        }
                    }
                }
            }
        });
    }

    function subtitleSuccessFunction(func, result) {
        var parser = new DOMParser(),
            doc = parser.parseFromString(result, "text/html"),
            myDoc = $(doc),
            button = myDoc.find("#downloadButton"),
            ratingBox = myDoc.find(".rating"),
            rating = "-";
        if (button.length > 0) {
            var link = "https://subscene.com" + button.attr("href");
            if (ratingBox.length > 0) {
                ratingBox = ratingBox.find("span");
                if (ratingBox.length > 0)
                    rating = ratingBox.html();
            }
            func(true, {link: link, rating: rating});
        }
    }

    function searchMovieSubtitle(name, year, func) {
        function failFunction() {
            func(false);
        }

        function movieSuccessFunction(result) {
            if (bringe.page != "movie") return;
            var parser = new DOMParser(),
                doc = parser.parseFromString(result, "text/html"),
                myDoc = $(doc);
            var links = myDoc.find("a[onmousedown]");
            var subsceneLinks = getSubsceneLinks(links);
            for (var i = 0; i < subsceneLinks.length; i++) {
                util.sendAjax(subsceneLinks[i], "GET", {}, util.getProxy(subtitleSuccessFunction, [func]), failFunction);
            }
        }

        var link = "https://www.google.com/search?q=" + name + "+" + year + "+english+-arabic+site:subscene.com/subtitles";
        util.sendAjax(link, "GET", {}, movieSuccessFunction, failFunction);
    }

    return {
        getSubtitleEpisode: getSubtitleEpisode,
        searchSubtitle: searchSubtitle,
        searchMovieSubtitle: searchMovieSubtitle
    }
});




_define('rottenTomatoes', [window, 'util', 'bringe'], function (window, util, bringe) {
    function searchMovie(q, callback) {
        var url = "https://www.rottentomatoes.com/api/private/v2.0/search/?limit=10&q=" + q;
        $.ajax({
            url: url,
            success: function (result) {
                if (typeof result != "object") {
                    try {
                        result = JSON.parse(result);
                    } catch (e) {
                        result = {};
                    }
                }
                if (result.movieCount) {
                    result.movies = util.filter(result.movies, function (movie) {
                        if (movie.meterScore) {
                            return true;
                        }
                    });
                    result.movieCount = result.movies.length;
                }
                callback(true, result);
            },
            error: function (result) {
                callback(false);
            }
        });
    }

    function getSeasonNumber(link) {
        if (link[link.length - 1] === '/') {
            link = link.slice(0, -1);
        }
        var parts = link.split("/"),
            seasonPart = parts[parts.length - 1],
            no;
        if (seasonPart[0] === 's') {
            no = parseInt(seasonPart.substr(1));
            if (no > 0) {
                return no;
            }
        }
        return null;
    }

    function loadRottenTomatoesEpisodesList(season, id, episodeFunc) {
        var link = "https://www.rottentomatoes.com/api/private/v2.0/tvSeason/" + id + "/episodes?offset=0&limit=50";
        if (bringe.page != "serie") return;
        $.ajax({
            url: link,
            success: function (result) {
                if (bringe.page != "serie") return;
                if (typeof result != "object") {
                    try {
                        result = JSON.parse(result);
                    } catch (e) {
                        result = [];
                    }
                }
                var episodes = [];
                for (var i = 0; i < result.length; i++) {
                    result[i].url = 'http://www.rottentomatoes.com' + result[i].url;
                    var episode = {
                        episodeNo: result[i].episodeNumber, title: result[i].title, date: result[i].airDate,
                        synopsis: result[i].synopsis, links: {rotten: result[i].url}
                    };
                    if (result[i].tomatometer && result[i].tomatometer.value) {
                        episode.ratings = {rotten: result[i].tomatometer.value};
                    } else {
                        episode.ratings = {};
                    }
                    if (season.imdbEpisodes) {
                        episode.ratings.imdb = season.imdbEpisodes[result[i].episodeNumber];
                    }
                    episodes.push(episode);
                }
                season.episodes = episodes;
                episodeFunc(true);
            }
        });
    }

    function loadRottenTomatoesMovie(movie, link, func) {
        if (bringe.page != "movie") return;
        $.ajax({
            url: link,
            success: function (result) {
                if (bringe.page != "movie") return;
                var parser = new DOMParser(),
                    doc = parser.parseFromString(result, "text/html"),
                    myDoc = $(doc),
                    img,
                    spans,
                    name,
                    role, i;
                var cast = myDoc.find(".cast-item");
                movie.cast = [];
                for (i = 0; i < cast.length && i < 12; i++) {
                    var member = cast[i];
                    img = $(member).find("img").attr("src");
                    spans = $(member).find("span");
                    if (spans[0])
                        name = spans[0].textContent.trim();
                    if (spans[1])
                        role = spans[1].textContent.trim();
                    var person = {name: name || '', role: role || '', image: img};
                    movie.cast.push(person);
                }
                var coverImageDiv = myDoc.find(".heroImage");
                if (coverImageDiv.length > 0) {
                    var coverImage = coverImageDiv[0].style.backgroundImage;
                    coverImage = coverImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                }
                if (util.isSet(coverImage)) {
                    movie.coverImage = coverImage || "";
                }
                var mainImageDiv = myDoc.find("#movie-image-section img");
                if (mainImageDiv.length > 0) {
                    var mainImage = mainImageDiv.attr("src");
                }
                if (util.isSet(mainImage)) {
                    movie.image = mainImage || "";
                }
                var year = myDoc.find("#heroImageContainer .year");
                if (year.length) {
                    year = year.html().trim().replace(/\(|\)/g, "");
                    movie.year = parseInt(year);
                }
                var movieInfoList = myDoc.find("ul.content-meta.info"),
                    oneInfo, label, value, infoList = [];
                if (movieInfoList) {
                    movieInfoList = movieInfoList.find("li.meta-row");
                    for (i = 0; i < movieInfoList.length; i++) {
                        oneInfo = movieInfoList[i];
                        label = $(oneInfo).find(".meta-label").text().trim();
                        value = $(oneInfo).find(".meta-value").text().trim();
                        infoList.push({label: label, value: value});
                    }
                    movie.infoList = infoList;
                }
                var audienceScore = myDoc.find(".audience-score .meter-value span").text().trim();
                if (audienceScore) {
                    movie.audienceScore = audienceScore;
                }
                var movieSynopsis = myDoc.find("#movieSynopsis").text().trim();
                movie.movieSynopsis = movieSynopsis;
                func(true, movie);
            },
            error: function () {
                func(false);
            }
        });
    }

    function loadRottenTomatoesSerie(serie, link, func) {
        if (bringe.page != "serie") return;
        $.ajax({
            url: link,
            success: function (result) {
                if (bringe.page != "serie") return;
                var parser = new DOMParser(),
                    doc = parser.parseFromString(result, "text/html"),
                    myDoc = $(doc),
                    img,
                    spans,
                    name,
                    role, i;
                var cast = myDoc.find(".cast-item");
                serie.cast = [];
                for (i = 0; i < cast.length && i < 12; i++) {
                    var member = cast[i];
                    img = $(member).find("img").attr("src");
                    spans = $(member).find("span");
                    if (spans[0])
                        name = spans[0].textContent.trim();
                    if (spans[1])
                        role = spans[1].textContent.trim();
                    var person = {name: name || '', role: role || '', image: img};
                    serie.cast.push(person);
                }
                var coverImageDiv = myDoc.find(".heroImage");
                if (coverImageDiv.length > 0) {
                    var coverImage = coverImageDiv[0].style.backgroundImage;
                    coverImage = coverImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                }
                serie.coverImage = coverImage || "";
                var mainImageDiv = myDoc.find("#tv-image-section img");
                if (mainImageDiv.length > 0) {
                    var mainImage = mainImageDiv.attr("src");
                }
                if (util.isSet(mainImage)) {
                    serie.image = mainImage || "";
                }
                var serieSynopsis = myDoc.find("#movieSynopsis").text().trim();
                if (serieSynopsis) {
                    serie.synopsis = serieSynopsis;
                }
                var audienceScore = myDoc.find(".audience-score .meter-value span").text().trim();
                if (audienceScore) {
                    serie.ratings.audienceScore = audienceScore;
                }
                var serieInfoList, movieInfo, subtle, oneInfo, tds, label, value, infoList = [];
                movieInfo = myDoc.find("#series_info .movie_info");
                if (movieInfo.length > 0) {
                    movieInfo.find("#movieSynopsis").remove();
                    serieInfoList = movieInfo.find("div");
                    for (i = 0; i < serieInfoList.length; i++) {
                        oneInfo = serieInfoList[i];
                        subtle = $(oneInfo).find(".subtle");
                        if (subtle.length > 0) {
                            label = subtle.text().trim();
                            subtle.remove();
                            value = $(oneInfo).text().trim();
                            infoList.push({label: label, value: value});
                        }
                    }
                }
                serieInfoList = myDoc.find("#detail_panel tr");
                for (i = 0; i < serieInfoList.length; i++) {
                    oneInfo = serieInfoList[i];
                    tds = $(oneInfo).find("td");
                    label = $(tds[0]).text().trim();
                    value = $(tds[1]).text().trim();
                    infoList.push({label: label, value: value});
                }
                serie.infoList = infoList;
                var seasons = [], oneSeason, seasonNumber, image, mediaBody, rottenLink, seasonName, meterValue, consensus, info, seasonId;
                var seasonsList = myDoc.find("#seasonList .seasonItem");
                for (i = 0; i < seasonsList.length; i++) {
                    oneSeason = $(seasonsList[i]);
                    seasonId = oneSeason.attr("id").replace("season", "");
                    image = oneSeason.find(".posterImage").attr("src");
                    mediaBody = oneSeason.find(".media-body");
                    link = oneSeason.find("a");
                    rottenLink = link.attr("href");
                    seasonName = link.text().trim();
                    seasonNumber = getSeasonNumber(rottenLink);
                    if (seasonNumber) {
                        rottenLink = "http://www.rottentomatoes.com" + rottenLink;
                        meterValue = mediaBody.find(".meter-value").text().trim();
                        consensus = mediaBody.find(".consensus").text().trim();
                        info = mediaBody.find(".season_info").text().trim();
                        seasons.push({
                            seasonNo: seasonNumber, title: seasonName, info: info, image: image,
                            consensus: consensus, links: {rotten: rottenLink},
                            ratings: {rotten: meterValue}, metaData: {rottenId: seasonId}
                        });
                    }
                }
                serie.seasons = seasons;
                func(true);
            },
            error: function () {
                func(false);
            }
        });
    }

    function loadRottenTomatoesSeason(season, link, func, episodeFunc) {
        if (bringe.page != "serie") return;
        $.ajax({
            url: link,
            success: function (result) {
                if (bringe.page != "serie") return;
                var parser = new DOMParser(),
                    doc = parser.parseFromString(result, "text/html"),
                    myDoc = $(doc),
                    img,
                    spans,
                    name,
                    role, i;
                var cast = myDoc.find(".cast-item");
                season.metadata = season.metadata || {};
                season.metadata.rottenId = season.metadata.rottenId || myDoc.find("meta[name='seasonID']").attr("content");
                season.cast = [];
                for (i = 0; i < cast.length && i < 12; i++) {
                    var member = cast[i];
                    img = $(member).find("img").attr("src");
                    spans = $(member).find("span");
                    if (spans[0])
                        name = spans[0].textContent.trim();
                    if (spans[1])
                        role = spans[1].textContent.trim();
                    var person = {name: name || '', role: role || '', image: img};
                    season.cast.push(person);
                }
                var mainImageDiv = myDoc.find("#tvPosterLink img");
                if (mainImageDiv.length > 0) {
                    var mainImage = mainImageDiv.attr("src");
                }
                if (util.isSet(mainImage)) {
                    season.image = mainImage || season.image || "";
                }
                var seasonSynopsis = myDoc.find("#movieSynopsis").text().trim();
                if (seasonSynopsis) {
                    season.synopsis = seasonSynopsis;
                }
                var audienceScore = myDoc.find(".audience-score .meter-value span").text().trim();
                if (audienceScore) {
                    season.ratings.audienceScore = audienceScore;
                }
                var seasonInfoList, oneInfo, label, value, infoList = [];
                seasonInfoList = myDoc.find("section.movie_info li");
                for (i = 0; i < seasonInfoList.length; i++) {
                    oneInfo = seasonInfoList[i];
                    label = $(oneInfo).find(".meta-label").text().trim();
                    value = $(oneInfo).find(".meta-value").text().trim();
                    infoList.push({label: label, value: value});
                }
                season.infoList = infoList;
                loadRottenTomatoesEpisodesList(season, season.metadata.rottenId, episodeFunc);
                func(true);
            },
            error: function () {
                func(false);
            }
        });
    }


    function loadRottenTomatoesEpisode(episode, link, func) {
        if (bringe.page != "serie") return;
        $.ajax({
            url: link,
            success: function (result) {
                if (bringe.page != "serie") return;
                var parser = new DOMParser(),
                    doc = parser.parseFromString(result, "text/html"),
                    myDoc = $(doc),
                    img,
                    spans,
                    name,
                    role, i;
                var cast = myDoc.find(".cast-item");
                episode.cast = [];
                episode.image = myDoc.find('#tv-image-section img').attr("src");
                var audienceScore = myDoc.find(".audience-score .meter-value span").text().trim();
                if (audienceScore) {
                    episode.ratings.audienceScore = audienceScore;
                }
                for (i = 0; i < cast.length && i < 12; i++) {
                    var member = cast[i];
                    img = $(member).find("img").attr("src");
                    spans = $(member).find("span");
                    if (spans[0])
                        name = spans[0].textContent.trim();
                    if (spans[1])
                        role = spans[1].textContent.trim();
                    var person = {name: name || '', role: role || '', image: img};
                    episode.cast.push(person);
                }
                var episodeInfoList, oneInfo, label, value, infoList = [];
                episodeInfoList = myDoc.find("ul.content-meta li.meta-row");
                for (i = 0; i < episodeInfoList.length; i++) {
                    oneInfo = episodeInfoList[i];
                    label = $(oneInfo).find(".meta-label").text().trim();
                    value = $(oneInfo).find(".meta-value").text().trim();
                    infoList.push({label: label, value: value});
                }
                episode.infoList = infoList;
                func(true);
            },
            error: function () {
                func(false);
            }
        });
    }

    function getMovie(movie, func) {
        var rottenLink = "https://www.rottentomatoes.com" + movie.url;
        movie.rottenlink = rottenLink;
        loadRottenTomatoesMovie(movie, rottenLink, func);
    }

    function getSerie(serie, func) {
        if (serie.links && serie.links.rotten) {
            loadRottenTomatoesSerie(serie, serie.links.rotten, func);
        }
    }

    function getSeason(season, func, episodeFunc) {
        if (season.links && season.links.rotten) {
            loadRottenTomatoesSeason(season, season.links.rotten, func, episodeFunc);
        }
    }

    function getEpisode(episode, func) {
        if (episode.links && episode.links.rotten) {
            loadRottenTomatoesEpisode(episode, episode.links.rotten, func);
        }
    }

    return {
        searchMovie: searchMovie,
        getMovie: getMovie,
        getSerie: getSerie,
        getSeason: getSeason,
        getEpisode: getEpisode
    }
});




_define('trailer', [window], function (window) {
    function searchGoogle(searchTerm, func) {
        var link = "https://www.google.com/search?q=" + searchTerm;
        $.ajax({
            url: link,
            success: function (result) {
                var parser = new DOMParser(),
                    doc = parser.parseFromString(result, "text/html"),
                    myDoc = $(doc);
                var links = myDoc.find("._Rm");
                if (links.length > 0) {
                    var link = $(links[0]).html();
                    var id = background.util().getParameterByName("v", link);
                    if (id && id != "") {
                        func(true, id);
                        return;
                    }
                }
                func(false);
            },
            error: function () {
                func(false);
            }
        });
    }

    function fetchMovieTrailer(name, year, callback) {
        var searchTerm = name + "+" + year + "+" + "trailer";
        searchGoogle(searchTerm, callback);
    }

    function fetchSeasonTrailer(serie, seasonNo, callback) {
        var name = serie.title;
        var searchTerm = name + "+Season+" + seasonNo + "+" + "trailer";
        searchGoogle(searchTerm, callback);
    }

    function setupYoutube(id) {
        $("#youtubePlayer").attr("src", "https://www.youtube.com/embed/" + id);
    }
    function removeYoutube() {
        $("#youtubePlayer").attr("src", "about:blank");
    }
    return {
        fetchMovieTrailer: fetchMovieTrailer,
        fetchSeasonTrailer: fetchSeasonTrailer,
        setupYoutube: setupYoutube,
        removeYoutube: removeYoutube
    }
});






_define('imdb', [window, 'util', 'bringe'], function (window, util, bringe) {
    function failFunction() {

    }
    function getEpisodeByNo(season, no) {
        var episodes = season.episodes,
            reqdEpisode = null;
        util.each(episodes, function (episode) {
            if (episode.episodeNo === no) {
                reqdEpisode = episode;
            }
        });
        return reqdEpisode;
    }
    function getSearchTerm(searchTerm) {
        searchTerm = searchTerm.trim().toLowerCase().replace(/\(.*\)/, "").replace(/^the/, "").replaceAll(/,| -|- /, " ");
        searchTerm = searchTerm.replace("part", "");
        searchTerm = searchTerm.replace(/\d*$/, "").replaceAll(/\s\s+/, " ").trim().replaceAll(" ", "+");
        return searchTerm;
    }
    function getRequiredMovie(divList, name) {
        var movieDetails = null;
        for (var i = 0; i < divList.length; i++) {
            var div = $(divList[i]);
            var divName  = div.find(".lister-item-header a").text().trim();
            if (util.isSameMovieName(divName, name)) {
                movieDetails = {};
                var imdbId = div.find(".lister-top-right .ribbonize").attr("data-tconst");
                var imdbRating = div.find(".ratings-imdb-rating").attr("data-value");
                var metaRating = div.find("span.metascore").text().trim();
                if (imdbId){
                    movieDetails.imdbId = imdbId;
                }
                if (imdbRating){
                    movieDetails.imdbRating = imdbRating;
                }
                if (metaRating){
                    movieDetails.metaRating = metaRating;
                }
                return movieDetails;
            }
        }
        return movieDetails;
    }
    function searchMovieSuccess(name, func, result) {
        if (bringe.page != "movie") return;
        var doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc),
            movieDivList = myDoc.find(".lister-item"),
            movieDetails = getRequiredMovie(movieDivList, name);
        if (!movieDetails) {
            func(false);
            return;
        }
        var movie = {};
        if (movieDetails.imdbRating) {
            movie.imdbRating = movieDetails.imdbRating;
        }
        if (movieDetails.metaRating) {
            movie.metaRating = movieDetails.metaRating;
        }
        if (movieDetails.imdbId) {
            movie.imdbId = movieDetails.imdbId;
        }
        func(true, movie);
    }
    function searchSerieSuccess(func, result) {
        if (bringe.page != "serie") return;
        var thisSerie = bringe.serie,
            doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc),
            serieDivList = myDoc.find(".lister-item"),
            serieDetails = getRequiredMovie(serieDivList, thisSerie.title);
        if (serieDetails.imdbRating) {
            thisSerie.ratings.imdbRating = serieDetails.imdbRating;
        }
        if (serieDetails.metaRating) {
            thisSerie.ratings.metaRating = serieDetails.metaRating;
        }
        if (serieDetails.imdbId) {
            thisSerie.metaData = thisSerie.metaData || {};
            thisSerie.metaData.imdbId = serieDetails.imdbId;
        }
        func(true);
    }
    function searchMovie(name, year, func) {
        var q = getSearchTerm(name);
        var url;
        if (year) {
            url = encodeURI('http://www.imdb.com/search/title?title=' + q + '&release_date=' + year + ',' + year + '&title_type=feature&view=advanced');
        } else {
            url = encodeURI('http://www.imdb.com/search/title?title=' + q + '&title_type=feature&view=advanced');
        }
        util.sendAjax(url, "GET", {}, util.getProxy(searchMovieSuccess, [name, func]), failFunction);
    }

    function searchSerie(q, func) {
        q = util.getSearchTerm(q);
        var url = encodeURI('http://www.imdb.com/search/title?title=' + q + '&title_type=tv_series&view=advanced');
        util.sendAjax(url, "GET", {}, util.getProxy(searchSerieSuccess, [func]), failFunction);
    }
    function episodeSuccess(result) {
        if (bringe.page != "serie") return;
        var doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc),
            episodeDivList = myDoc.find("#eplist a.btn-full"),
            episodes = [],
            thisSerie = bringe.serie,
            thisSeason = bringe.season;
        if (episodeDivList) {
            for (var i = 0; i < episodeDivList.length; i++) {
                var div = $(episodeDivList[i]),
                    title = div.find(".text-large"),
                    no = parseInt(title.contents().not(title.children()).text().trim().replace(".", "")),
                    rating = $(div.find("strong")[1]).text().trim();
                episodes[no] = rating;
                if (thisSerie.episodes) {
                    var episode = getEpisodeByNo(thisSeason, no);
                    episode.ratings.imdb = rating;
                }
            }
            if (!thisSerie.episodes) {
                thisSeason.imdbEpisodes = episodes;
            }
        }
    }
    function loadEpisodes(serieId, sNo) {
        var url = 'http://m.imdb.com/title/' + serieId +'/episodes/_ajax/?season=' + sNo;
        util.sendAjax(url, "GET", {}, episodeSuccess, failFunction);
    }
    return {
        searchMovie: searchMovie,
        searchSerie: searchSerie,
        loadEpisodes:loadEpisodes
    }
});







_define('google', [window], function (window) {
    function getSiteName(link) {
        var start = link.indexOf(".");
        start++;
        var end = link.indexOf(".com");
        return link.substring(start, end);
    }

    function getMovieSearchName(searchTerm) {
        searchTerm = searchTerm.trim().toLowerCase().replace(/\(.*\)/, "").replace(/ /g, '+');
        return searchTerm;
    }

    function searchMovie(name, year, callback) {
        var q = getMovieSearchName(name);
        var link = "https://www.google.com/search?q=" + encodeURIComponent(q) + "+" + year;
        $.ajax({
            url: link,
            success: function (result) {
                var parser = new DOMParser(),
                    doc = parser.parseFromString(result, "text/html"),
                    myDoc = $(doc),
                    reviews = [],
                    social = [],
                    i;
                var criticReviews = myDoc.find("critic-reviews-container ._Xai");
                for (i = 0; i < criticReviews.length; i++) {
                    var review = {};
                    var criticReview = $(criticReviews[i]);
                    var text = criticReview.find("._Qsh i").html();
                    var sourceDiv = criticReview.find("._Kpm div");
                    var source = {};
                    if (sourceDiv.length > 0) {
                        var sourceSite = $(sourceDiv).find("a").text().trim();
                        if (sourceSite && sourceSite != "") {
                            source.sourceSite = sourceSite;
                        }
                        var sourceName = $(sourceDiv).clone().children().remove().end().text();
                        if (sourceName && sourceName != "") {
                            source.name = sourceName;
                        }
                    }
                    if (text && text != "" && source && source.name) {
                        review.text = text;
                        review.source = source;
                        reviews.push(review);
                    }
                }
                var socialLinks = myDoc.find("._Ugf g-link a");
                for (i = 0; i < socialLinks.length; i++) {
                    var socialLink = $(socialLinks[i]);
                    var link = socialLink.attr("href");
                    var site = getSiteName(link);
                    if (link && site && site != "") {
                        social.push({link: link, site: site});
                    }
                }
                var movie = {};
                if (reviews.length > 0) {
                    movie.reviews = reviews;
                }
                if (social.length) {
                    movie.social = social;
                }
                callback(true, movie);
            },
            error: function () {
                callback(false);
            }
        });
    }

    return {
        searchMovie: searchMovie
    }
});






_define('gomovies', [window, 'util', 'bringe'], function (window, util, bringe) {
    var callback;
    var base_url = "https://gostream.is";
    var mid;

    function failFunction() {
        if (bringe.page != "movie") return;
        callback({site: "gomovies", status: false});
    }

    function successFunction(linkDetails) {
        if (bringe.page != "movie") return;
        callback({site: "gomovies", status: true, linkDetails: linkDetails});
    }

    function isSameMovieName1(a, b) {
        a = a.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "");
        b = b.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "");
        return a == b;
    }

    function isSameMovieName2(a, b) {
        a = a.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        b = b.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        return a == b;
    }

    function isSameMovieName3(a, b) {
        a = a.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        b = b.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        return a == b;
    }

    function isSameMovieName4(a, b) {
        a = a.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "").replace(/iii$/, "3").replace(/ii$/, "2");
        b = b.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "").replace(/iii$/, "3").replace(/ii$/, "2");
        return a == b;
    }

    function getMovies123SearchTerm1(searchTerm) {
        searchTerm = searchTerm.trim().toLowerCase().replace(/\(.*\)/, "").replace(/'/, "").replace(/^the/, "").replaceAll(/,|:| -|- /, " ");
        searchTerm = searchTerm.replace("part", "");
        searchTerm = searchTerm.replace(/\d*$/, "").trim().replaceAll(/\s+/, "+");
        return searchTerm;
    }

    function getMovies123SearchTerm2(searchTerm) {
        searchTerm = searchTerm.trim().toLowerCase().replace(/\(.*\)/, "").replace(/^the/, "").replaceAll(/,|:| -|- |'/, " ");
        searchTerm = searchTerm.replace(/\d*$/, "").trim().replaceAll(/\s+/, "+");
        return searchTerm;
    }

    function getMovies123SearchTerm3(searchTerm) {
        searchTerm = searchTerm.trim().toLowerCase().replace(/\(.*\)/, "").replace(/^the/, "").replaceAll(/,|:| -|- |'/, " ");
        searchTerm = searchTerm.replace("part", "");
        searchTerm = searchTerm.replace(/i*$/, "").trim().replaceAll(/\s+/, "+");
        return searchTerm;
    }

    function getMovies123SearchTerms(searchTerm) {
        var terms = [];
        terms.push(getMovies123SearchTerm1(searchTerm));
        terms.push(getMovies123SearchTerm2(searchTerm));
        terms.push(getMovies123SearchTerm3(searchTerm));
        terms = terms.filter(function (item, pos) {
            return terms.indexOf(item) == pos;
        });
        return terms;
    }

    function getMovies123SearchedMovie(movieItems) {
        if (movieItems.length == 1) {
            return movieItems;
        }
        var movieItem, movieName, name = bringe.movie.name;
        for (var i = 0; i < movieItems.length; i++) {
            movieItem = movieItems[i];
            movieName = $(movieItem).find(".ss-title").text();
            if (isSameMovieName1(movieName, name)) {
                return movieItem;
            }
        }
        for (i = 0; i < movieItems.length; i++) {
            movieItem = movieItems[i];
            movieName = $(movieItem).find(".ss-title").text();
            if (isSameMovieName2(movieName, name)) {
                return movieItem;
            }
        }
        for (i = 0; i < movieItems.length; i++) {
            movieItem = movieItems[i];
            movieName = $(movieItem).find(".ss-title").text();
            if (isSameMovieName3(movieName, name)) {
                return movieItem;
            }
        }
        failFunction();
    }

    function getMovies123SearchedMovie2(name, movieItems) {
        if (movieItems.length == 1) {
            return movieItems;
        }
        var movieItem, movieName, movieNames = [];
        for (var i = 0; i < movieItems.length; i++) {
            movieItem = movieItems[i];
            movieName = $(movieItem).find("a").attr("title");
            movieNames.push(movieName);
        }
        for (i = 0; i < movieItems.length; i++) {
            if (isSameMovieName1(movieNames[i], name)) {
                return movieItems[i];
            }
        }
        for (i = 0; i < movieItems.length; i++) {
            if (isSameMovieName2(movieNames[i], name)) {
                return movieItems[i];
            }
        }
        for (i = 0; i < movieItems.length; i++) {
            if (isSameMovieName3(movieNames[i], name)) {
                return movieItems[i];
            }
        }
        for (i = 0; i < movieItems.length; i++) {
            if (isSameMovieName4(movieNames[i], name)) {
                return movieItems[i];
            }
        }
        failFunction();
    }

    function dataHandler(eid, result) {
        try {
            result = JSON.parse(result);
            if (result && result.playlist && result.playlist[0] && result.playlist[0].sources && result.playlist[0].sources.length > 0) {
                var sources = result.playlist[0].sources,
                    sourceList = [];
                for (var i = 0; i < sources.length; i++) {
                    var source = sources[i];
                    source.src = source.file;
                    source.res = source.res || parseInt(source.label);
                    if (!source.res) {
                        source.res = '-';
                        source.label = '-';
                    }
                    source.source = "gomovies";
                    source.id = eid + '*' + source.res;
                    bringe.movie.streamLinkDetails = bringe.movie.streamLinkDetails || [];
                    sourceList.push(source);
                }
                successFunction(sourceList);
            } else {
                failFunction();
            }
        } catch (error) {
            failFunction();
        }
    }

    function hashSuccessFunction(eid, result) {
        var parts = result.split(',');
        var x = parts[0].split("'")[1];
        var y = parts[1].split("'")[1];
        var link = base_url + '/ajax/movie_sources/' + eid + '?x=' + x + '&y=' + y;
        if (x && y) {
            util.sendAjax(link, "GET", {}, util.getProxy(dataHandler, [eid]), failFunction);
        } else {
            failFunction();
        }
    }

    function getMovies123MovieLinks(eids) {
        for (var i = 0; i < eids.length; i++) {
            var eid = eids[i];
            var link = base_url + '/ajax/movie_token?eid=' + eid + '&mid=' + mid;
            util.sendAjax(link, "GET", {}, util.getProxy(hashSuccessFunction, [eid]), failFunction);
        }
    }

    function getMovieId(url) {
        var parts = url.split("-");
        var part = parts[parts.length - 1];
        var id = part.split("/")[0];
        return id;
    }

    function getMovies123Eids(servers) {
        var eids = [];
        for (var i = 0; i < servers.length; i++) {
            var server = servers[i];
            var link = $(server).find("a.btn-eps");
            var eid = link.attr("data-id");
            if (eid) {
                eids.push(eid);
            }
        }
        return eids;
    }

    function episodesSuccessFunction(result) {
        if (bringe.page != "movie") return;
        try {
            var json = JSON.parse(result);
            if (json.status) {
                var doc = new DOMParser().parseFromString(json.html, "text/html"),
                    myDoc = $(doc),
                    servers = myDoc.find(".le-server");
                if (servers.length > 0) {
                    var eids = getMovies123Eids(servers);
                    if (eids.length > 0) {
                        getMovies123MovieLinks(eids);
                        return;
                    }
                }
            }
        } catch (ignore) {
        }
        failFunction();
    }

    function moviePageSuccessFunction(result) {
        if (bringe.page != "movie") return;
        var doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc),
            url = myDoc.find(".fb-comments").attr("data-href"),
            movies123MovieId = getMovieId(url),
            movies123FetchLink = base_url + "/ajax/movie_episodes/" + movies123MovieId;
        mid = movies123MovieId;
        util.sendAjax(movies123FetchLink, "GET", {}, episodesSuccessFunction, failFunction);
    }

    function searchSuccessFunction1(result) {
        if (bringe.page != "movie") return;
        result = JSON.parse(result);
        if (result.status == 1 && result.message == "Success") {
            var content = result.content;
            var doc = new DOMParser().parseFromString(content, "text/html"),
                myDoc = $(doc);
            var movieItems = myDoc.find("li:not(.ss-bottom)");
            if (movieItems.length > 0) {
                var movieItem = getMovies123SearchedMovie(movieItems);
                if (movieItem) {
                    var movies123MoviePageLink = $(movieItem).find(".ss-title").attr("href") + "watching.html";
                    util.sendAjax(movies123MoviePageLink, "GET", {}, moviePageSuccessFunction, failFunction);
                    return;
                }
            }
        }
        failFunction();
    }

    function load(func) {
        callback = func;
        var salt = "x6a4moj7q8xq6dk5";
        var searchName = getMovies123SearchTerm();
        var link = base_url + '/ajax/suggest_search';
        util.sendAjax(link, "POST", {
            keyword: searchName,
            token: md5(searchName + salt)
        }, searchSuccessFunction1, failFunction);
    }

    function searchMovie(name, searchList) {
        var found = false;

        function searchSuccessFunction(result) {
            if (bringe.page != "movie" || found) return;
            var doc = new DOMParser().parseFromString(result, "text/html"),
                myDoc = $(doc);
            var movieItems = myDoc.find(".movies-list .ml-item");
            if (movieItems.length > 0) {
                var movieItem = getMovies123SearchedMovie2(name, movieItems);
                if (movieItem) {
                    found = true;
                    var movies123MoviePageLink = $(movieItem).find("a").attr("href") + "watching.html";
                    util.sendAjax(movies123MoviePageLink, "GET", {}, moviePageSuccessFunction, failFunction);
                    return;
                }
            }
            failFunction();
        }

        var links = [];
        util.each(searchList, function (searchTerm) {
            links.push(base_url + '/movie/search/' + searchTerm);
        });
        util.each(links, function (link) {
            util.sendAjax(link, "GET", {}, searchSuccessFunction, failFunction);
        });
    }

    function loadMovie(name, year, func) {
        callback = func;
        var searchNames = getMovies123SearchTerms(name);
        searchMovie(name, searchNames);
    }

    return {
        loadMovie: loadMovie
    }
});




_define('fmovies', [window, 'util', 'bringe'], function (window, util, bringe) {
    var callback;
    var base_url = "https://fmovies.is";
    var ts;

    function failFunction() {
        if (bringe.page != "movie") return;
        callback({site: "fmovies", status: false});
    }

    function successFunction(linkDetails) {
        if (bringe.page != "movie") return;
        callback({site: "fmovies", status: true, linkDetails: linkDetails});
    }

    function hashUrl(t, params) {

        var salt = 'bLeqpV';
        var y = ts;

        function r(t, params) {
            var e, i = /([^=\?&]+)(?:=([^&$]+))?/gi, n = {};
            if (t.indexOf('?') > -1) {
                do {
                    e = i.exec(t.url),
                    e && (n[e[1]] = decodeURIComponent(e[2] || '').replace(/\+/g, ' '));
                } while (e);
            }
            if (params) {
                do {
                    e = i.exec(params),
                    e && (n[e[1]] = decodeURIComponent(e[2] || '').replace(/\+/g, ' '));
                } while (e);
            }
            return n;
        }

        function a(t, e) {
            var i, n = 0;
            for (i = 0; i < Math.max(t.length, e.length); i++) {
                n += i < e.length ? e.charCodeAt(i) : 0;
                n += i < t.length ? t.charCodeAt(i) : 0;
            }
            return Number(n).toString(16);
        }

        function s(t) {
            var e, i = 0;
            for (e = 0; e < t.length; e++) {
                i += t.charCodeAt(e) * e - e;
            }
            return i;
        }

        function o(t) {
            var i, r, o = s(salt), l = {};
            r = t;
            r.ts = '' + y;
            for (i in r) {
                Object.prototype.hasOwnProperty.call(r, i) && (o += s(a(salt + i, r[i])));
            }
            l.ts = y;
            l._ = o;
            return l;
        }

        function d(t, e) {
            var i, n = '';
            for (i in e) {
                Object.prototype.hasOwnProperty.call(e, i) && (n += '&' + i + '=' + e[i]);
            }
            return t + (t.indexOf('?') < 0 ? '?' : '&') + n.substr(1);
        }

        var e = o(r(t, params));
        var x = d(t, e);
        return x + (x.indexOf('?') < 0 ? '?' : '&') + params;
    }


    function isSameMovieName1(a, b) {
        a = a.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "");
        b = b.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "");
        return a == b;
    }

    function isSameMovieName2(a, b) {
        a = a.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        b = b.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        return a == b;
    }

    function isSameMovieName3(a, b) {
        a = a.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        b = b.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        return a == b;
    }

    function isSameMovieName4(a, b) {
        a = a.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "").replace("part", "").replace(/iii$/, "3").replace(/ii$/, "2");
        b = b.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "").replace("part", "").replace(/iii$/, "3").replace(/ii$/, "2");
        return a == b;
    }

    function getMovies123SearchTerm1(searchTerm) {
        searchTerm = searchTerm.trim().toLowerCase().replace(/\(.*\)/, "").replace(/'/, "").replace(/^the/, "").replaceAll(/,|:| -|- /, " ");
        searchTerm = searchTerm.replace("part", "");
        searchTerm = searchTerm.replace(/\d*$/, "").trim().replaceAll(/\s+/, "+");
        return searchTerm;
    }

    function getMovies123SearchTerm2(searchTerm) {
        searchTerm = searchTerm.trim().toLowerCase().replace(/\(.*\)/, "").replace(/^the/, "").replaceAll(/,|:| -|- |'/, " ");
        searchTerm = searchTerm.replace(/\d*$/, "").trim().replaceAll(/\s+/, "+");
        return searchTerm;
    }

    function getMovies123SearchTerm3(searchTerm) {
        searchTerm = searchTerm.trim().toLowerCase().replace(/\(.*\)/, "").replace(/^the/, "").replaceAll(/,|:| -|- |'/, " ");
        searchTerm = searchTerm.replace("part", "");
        searchTerm = searchTerm.replace(/i*$/, "").trim().replaceAll(/\s+/, "+");
        return searchTerm;
    }

    function getMovies123SearchTerms(searchTerm) {
        var terms = [];
        terms.push(getMovies123SearchTerm1(searchTerm));
        terms.push(getMovies123SearchTerm2(searchTerm));
        terms.push(getMovies123SearchTerm3(searchTerm));
        terms = terms.filter(function (item, pos) {
            return terms.indexOf(item) == pos;
        });
        return terms;
    }

    function getMovies123SearchedMovie2(name, movieItems) {
        if (movieItems.length == 1) {
            return movieItems;
        }
        var movieItem, movieName, movieNames = [];
        for (var i = 0; i < movieItems.length; i++) {
            movieItem = movieItems[i];
            movieName = $(movieItem).find("a.name").html();
            movieNames.push(movieName);
        }
        for (i = 0; i < movieItems.length; i++) {
            if (isSameMovieName1(movieNames[i], name)) {
                return movieItems[i];
            }
        }
        for (i = 0; i < movieItems.length; i++) {
            if (isSameMovieName2(movieNames[i], name)) {
                return movieItems[i];
            }
        }
        for (i = 0; i < movieItems.length; i++) {
            if (isSameMovieName3(movieNames[i], name)) {
                return movieItems[i];
            }
        }
        for (i = 0; i < movieItems.length; i++) {
            if (isSameMovieName4(movieNames[i], name)) {
                return movieItems[i];
            }
        }
        failFunction();
    }

    function dataHandler(index, subtitle, result) {
        try {
            result = JSON.parse(result);
            if (result && !result.error && result.data) {
                var sources = result.data,
                    sourceList = [];
                for (var i = 0; i < sources.length; i++) {
                    var source = sources[i];
                    source.src = source.file;
                    source.res = source.res || parseInt(source.label);
                    if (!source.res) {
                        source.res = '-';
                        source.label = '-';
                    }
                    source.source = "fmovies";
                    source.id = 'fm-' + index + '*' + source.res;
                    source.subtitles = [subtitle];
                    bringe.movie.streamLinkDetails = bringe.movie.streamLinkDetails || [];
                    sourceList.push(source);
                }
                successFunction(sourceList);
            } else {
                failFunction();
            }
        } catch (error) {
            failFunction();
        }
    }

    function getMovieStreams(url, index, subtitle) {
        util.sendAjax(url, "GET", {}, util.getProxy(dataHandler, [index, subtitle]), failFunction);
    }

    function cleanSpecialUrl(url) {
        return url.indexOf('?') > -1 ? url.substring(0, url.indexOf('?')) : url;
    }

    function getParamString(obj) {
        var str = "";
        util.each(obj, function (val, key) {
            str += "&" + key + "=" + val;
        });
        return str;
    }

    function episodesSuccessFunction(index, json) {
        if (bringe.page != "movie") return;
        try {
            json = JSON.parse(json);
        } catch (ignore) {
        }
        if (json.target) {
            json.target = cleanSpecialUrl(json.target);
            //dataHandler(index, json.subtitle, JSON.stringify({data: [{file: json.target}]}));
        } else if (json && json.grabber && json.params) {
            var url = hashUrl(json.grabber + getParamString(json.params), '');
            getMovieStreams(url, index, json.subtitle);
        }
        failFunction();
    }

    function moviePageSuccessFunction(result) {
        if (bringe.page != "movie") return;
        var doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc),
            movies123FetchLink,
            movies123MovieIds = myDoc.find("ul.episodes a"),
            movieId;
        for (var i = 0; i < movies123MovieIds.length; i++) {
            movieId = $(movies123MovieIds[i]).attr("data-id");
            movies123FetchLink = hashUrl(base_url + '/ajax/episode/info', 'id=' + movieId + '&update=0');
            util.sendAjax(movies123FetchLink, "GET", {}, util.getProxy(episodesSuccessFunction, [i]), failFunction);
        }
    }

    function searchMovie(name, searchList) {
        var found = false;

        function searchSuccessFunction(result) {
            if (bringe.page != "movie" || found) return;
            try {
                result = JSON.parse(result);
            } catch (ignore) {
            }
            if (result.html) {
                var doc = new DOMParser().parseFromString(result.html, "text/html"),
                    myDoc = $(doc);
                var movieItems = myDoc.find(".item");
                if (movieItems.length > 0) {
                    var movieItem = getMovies123SearchedMovie2(name, movieItems);
                    if (movieItem) {
                        found = true;
                        var movies123MoviePageLink = base_url + $(movieItem).find("a.name").attr("href");
                        util.sendAjax(movies123MoviePageLink, "GET", {}, moviePageSuccessFunction, failFunction);
                        return;
                    }
                }
            }
            failFunction();
        }

        var links = [];
        util.each(searchList, function (searchTerm) {
            links.push(hashUrl(base_url + '/ajax/film/search', 'sort=year%3Adesc&keyword=' + searchTerm));
        });
        util.each(links, function (link) {
            util.sendAjax(link, "GET", {}, searchSuccessFunction, failFunction);
        });
    }

    function tsSuccessFunction(name, searchNames, result) {
        if (bringe.page != "movie") return;
        var doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc);
        ts = myDoc.find("body").attr("data-ts");
        searchMovie(name, searchNames);
    }

    function loadMovie(name, year, func) {
        callback = func;
        var searchNames = getMovies123SearchTerms(name);
        util.sendAjax(base_url, "GET", {}, util.getProxy(tsSuccessFunction, [name, searchNames]), failFunction);
    }

    return {
        loadMovie: loadMovie
    }
});








_define('watchit', [window, 'util', 'bringe'], function (window, util, bringe) {
    var base_url = "https://gowatchit.com";

    function failFunction(func) {
        func({site: "watchit", status: false});
    }

    function movieSuccessFunction(youtubeId, linkDetails, func) {
        if (bringe.page != "movie") return;
        func({site: "watchit", status: true, linkDetails: linkDetails, youtubeId: youtubeId});
    }

    function serieSuccessFunction(youtubeId, seasons, func) {
        if (bringe.page != "serie") return;
        func({site: "watchit", status: true, seasons: seasons, youtubeId: youtubeId});
    }

    function seasonSuccessFunction(linkDetails, func) {
        if (bringe.page != "serie") return;
        func({site: "watchit", status: true, linkDetails: linkDetails});
    }

    function getApiKey() {
        return window["X-Api-Key"];
    }

    function getSeasonNoByLink(link) {
        try {
            var part = link.split('/season/')[1];
            var no = part.split('/')[0];
        } catch (ignore) {}
        return no;
    }
    function getIdByLink(link) {
        try {
            var parts = link.split('/');
            var no = parts[parts.length - 1];
        } catch (ignore) {}
        return no;
    }

    function fetchApiKey(callback, func) {
        function fetchApiSuccessFunction(result) {
            var doc = new DOMParser().parseFromString(result, "text/html"),
                myDoc = $(doc);
            try {
                var script = myDoc.find("body script")[0];
                var text = $(script).html(), key;
                text = text.split(";")[0];
                text = text.split("',")[0];
                text = text.split("'")[1];
            } catch (ignore) {}
            if (text && text.length == 24) {
                window["X-Api-Key"] = text;
                callback(text);
                return;
            }
            failFunction(func);
        }
        var link = 'https://gowatchit.com/home';
        util.sendAjax(link, "GET", {}, fetchApiSuccessFunction, util.getProxy(failFunction, [func]));
    }

    function getSearchBody(name, year, isSerie) {
        year = year + "";
        var type = isSerie ? "Show" : "Movie";
        var obj = {"query":{"bool":{"must":[{"bool":{"should":[{"match":{"title":{"query":name}}},{"match_phrase_prefix":{"title":{"query":name,"max_expansions":1024,"lenient":true,"slop":5,"boost":6}}},{"match":{"title":{"query":name,"fuzziness":1,"operator":"and"}}}]}},{"bool":{"should":[{"match":{"year":{"query":year}}}]}},{"terms":{"searchableType":[type]}}]}},"fields":["id","title","year","searchableType","posterUrl","shortDescription","trailerUrl"],"filter":{"type":{"value":"Asset"}}};
        return JSON.stringify(obj);
    }

    function getMoviePageLink(name, id, isSerie) {
        name = name.toLowerCase();
        name = name.replace(/[^0-9a-z ]/gi, '');
        name =name.replace(/ /g, '-');
        if (isSerie) {
            return base_url + '/watch/shows/' + name + '-' + id;
        } else {
            return base_url + '/watch/movies/' + name + '-' + id;
        }
    }

    function moviePageSuccessFunction(movieId, youtubeId, func, result) {
        if (bringe.page != "movie") return;
        var doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc),
            divs = myDoc.find("ul.channels li.tile a[data-provider-format-id]"),
            id, link, img;
        var streams = [];
        for (var i = 0; i < divs.length; i++) {
            var div = $(divs[i]);
            id = div.attr("data-provider-format-id");
            link = 'https://gowatchit.com/movies/' + movieId + '/watch_now?provider_format_id=' + id;
            img = div.find("img").attr("src");
            streams.push({link: link, image: img, source: 'watchit', id: 'x' + id});
        }
        movieSuccessFunction(youtubeId, streams, func);
    }
    function seasonPageSuccessFunction(seasonId, func, result) {
        if (bringe.page != "serie") return;
        var doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc),
            divs = myDoc.find("ul.channels li.tile a[data-provider-format-id]"),
            id, link, img;
        var streams = [];
        for (var i = 0; i < divs.length; i++) {
            var div = $(divs[i]);
            id = div.attr("data-provider-format-id");
            link = 'https://gowatchit.com/seasons/' + seasonId + '/watch_now?provider_format_id=' + id;
            img = div.find("img").attr("src");
            streams.push({link: link, image: img, source: 'watchit', id: 'x' + id});
        }
        seasonSuccessFunction(streams, func);
    }

    function seriePageSuccessFunction(serieId, youtubeId, func, result) {
        if (bringe.page != "serie") return;
        var doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc),
            divs = myDoc.find(".seasons-dropdown"),
            link, seasonNo, id;
        var seasons = {};
        for (var i = 0; i < divs.length; i++) {
            var div = $(divs[i]);
            link = div.attr("href");
            link = 'https://gowatchit.com' + link;
            if (div.attr("data-index") > -1) {
                seasonNo = getSeasonNoByLink(link);
                id = getIdByLink(link);
                if (seasonNo) {
                    seasons[seasonNo + ""] = {pageLink: link, seasonNo: seasonNo, seasonId: id};
                }
            }
        }
        serieSuccessFunction(youtubeId, seasons, func);
    }

    function searchMovie(name, year, func, isSerie, apiKey) {
        function searchSuccessFunction(result) {
            if (result && result.hits && result.hits.hits && result.hits.hits[0] && result.hits.hits[0].fields) {
                try {
                    var movie = result.hits.hits[0].fields;
                    var id = movie.id[0].split('-')[1];
                    var title = movie.title && movie.title[0];
                    var trailerUrl = movie.trailerUrl && movie.trailerUrl[0];
                    var posterUrl = movie.posterUrl && movie.posterUrl[0];
                    var link = getMoviePageLink(title, id, isSerie);
                } catch (ignore) {}
                if (link) {
                    var successFunc = isSerie? seriePageSuccessFunction : moviePageSuccessFunction;
                    util.sendAjax(link, "GET", {}, util.getProxy(successFunc, [id, trailerUrl, func]), util.getProxy(failFunction, [func]));
                    return;
                }
            }
            failFunction(func);
        }
        var link = base_url + '/api/v3/advanced_search/_search';
        util.sendAjax(link, "POST", getSearchBody(name, year, isSerie), searchSuccessFunction, util.getProxy(failFunction, [func]), {'X-Api-Key': apiKey});
    }

    function getApiAndSearchMovie(name, year, func, isSerie) {
        var apiKey = getApiKey();
        if(apiKey) {
            searchMovie(name, year, func, isSerie, apiKey);
        } else {
            fetchApiKey(util.getProxy(searchMovie, [name, year, func, isSerie]), func);
        }
    }

    function loadMovie(name, year, func) {
        getApiAndSearchMovie(name, year, func, false);
    }
    function loadSerie(name, year, func) {
        getApiAndSearchMovie(name, year, func, true);
    }
    function loadSeason(link, id, func) {
        if (link) {
            util.sendAjax(link, "GET", {}, util.getProxy(seasonPageSuccessFunction, [id, func]), util.getProxy(failFunction, [func]));
        } else {
            failFunction(func);
        }
    }

    return {
        loadMovie: loadMovie,
        loadSerie: loadSerie,
        loadSeason: loadSeason
    }
});







_define('series', [window, 'util', 'bringe', 'layout', 'goseries', 'fseries', 'watchit', 'watchseries'],
    function (window, util, bringe, layout, goseries, fseries, watchit, watchseries) {

        function handleSerieResponse() {

        }

        function handleSeasonResponse() {

        }

        function handleEpisodeResponse() {

        }

        function handleDownloadResponse() {

        }

        function handleStreamResponse() {

        }

        function handleWatchitSeason(object) {
            if (object.status) {
                var season;
                var thisSerie = bringe.serie,
                    seasonNo = bringe.season.seasonNo;
                if (thisSerie.websites && thisSerie.websites.watchit && thisSerie.websites.watchit.seasons) {
                    var seasons = thisSerie.websites.watchit.seasons;
                    if (seasons[seasonNo + '']) {
                        season = seasons[seasonNo + ''];
                    }
                }
                if (season) {
                    season.externalStreams = [];
                    for (var i = 0; i < object.linkDetails.length; i++) {
                        season.externalStreams.push(object.linkDetails[i]);
                    }
                }
            }
        }

        function handleWatchitSerie(result) {
            var thisSerie = bringe.serie;
            if (result.status) {
                thisSerie.websites = thisSerie.websites || {};
                thisSerie.websites.watchit = thisSerie.websites.watchit || {};
                thisSerie.websites.watchit.seasons = result.seasons;
            }
        }

        function getWatchitSeason() {
            var thisSerie = bringe.serie;
            var thisSeason = bringe.season;
            if (thisSerie.websites && thisSerie.websites.watchit && thisSerie.websites.watchit.seasons) {
                var seasons = thisSerie.websites.watchit.seasons;
                if (seasons[thisSeason.seasonNo + '']) {
                    return seasons[thisSeason.seasonNo + ''];
                }
            }
        }

        function loadSerie() {
            if (bringe.page != "serie") return;
            var thisSerie = bringe.serie;
            var obj = {title: thisSerie.title};
            watchseries.loadSerie(obj, handleSerieResponse);
            watchit.loadSerie(thisSerie.title, thisSerie.startYear, handleWatchitSerie);
        }

        function loadSeason() {
            if (bringe.page != "serie") return;
            var thisSerie = bringe.serie;
            var obj = {title: thisSerie.title, seasonNo: thisSerie.seasonNo};
            goseries.loadSeason(obj, handleSeasonResponse);
            fseries.loadSeason(obj, handleSeasonResponse);
            var season = getWatchitSeason();
            if (season) {
                watchit.loadSeason(season.pageLink, season.seasonId, handleWatchitSeason);
            }
        }

        function loadEpisode() {
            if (bringe.page != "serie") return;
            var obj = {title: bringe.serie.title, seasonNo: bringe.serie.seasonNo, episodeNo: bringe.serie.episodeNo};
            goseries.loadEpisode(obj, handleEpisodeResponse);
            fseries.loadEpisode(obj, handleEpisodeResponse);
            watchseries.loadEpisode(obj, handleEpisodeResponse);
        }

        function getStreamLinks() {
            if (bringe.page != "serie") return;
            var obj = {seasonNo: bringe.serie.seasonNo, episodeNo: bringe.serie.episodeNo};
            var streamLinks = [],
                links;
            links = goseries.getStreamLinks(obj);
            if (links && util.isArray(links) && links.length > 0) {
                Array.prototype.push.apply(streamLinks, links);
            }
            links = fseries.getStreamLinks(obj);
            if (links && util.isArray(links) && links.length > 0) {
                Array.prototype.push.apply(streamLinks, links)
            }
            links = watchseries.getStreamLinks(obj);
            if (links && util.isArray(links) && links.length > 0) {
                Array.prototype.push.apply(streamLinks, links)
            }
            return streamLinks;
        }

        function downloadEpisodeStreamLink(arg) {
            if (bringe.page != "serie") return;
            var thisSerie = bringe.serie;
            var id = arg.id,
                source = arg.source;
            var obj = {seasonNo: thisSerie.seasonNo, episodeNo: thisSerie.episodeNo, id: id};
            if (source === "goseries") {
                goseries.downloadEpisodeStreamLink(obj, handleDownloadResponse);
            } else if (source === "fseries") {
                fseries.downloadEpisodeStreamLink(obj, handleDownloadResponse);
            } else if (source === "watchseries") {
                watchseries.downloadEpisodeStreamLink(obj, handleDownloadResponse);
            }
        }

        function streamEpisodeStreamLink(arg) {
            if (bringe.page != "serie") return;
            var thisSerie = bringe.serie;
            var id = arg.id,
                source = arg.source;
            var obj = {seasonNo: thisSerie.seasonNo, episodeNo: thisSerie.episodeNo, id: id};
            if (source === "goseries") {
                goseries.streamEpisodeStreamLink(obj, handleStreamResponse);
            } else if (source === "fseries") {
                fseries.streamEpisodeStreamLink(obj, handleStreamResponse);
            } else if (source === "watchseries") {
                watchseries.streamEpisodeStreamLink(obj, handleStreamResponse);
            }
        }

        function getEpisodeBySelector(selector) {
            var id = selector.id,
                source = selector.source;
            var thisSerie = bringe.serie;
            var obj = {seasonNo: thisSerie.seasonNo, episodeNo: thisSerie.episodeNo, id: id};
            if (source === "goseries") {
                return goseries.getEpisodeBySelector(obj);
            } else if (source === "fseries") {
                return fseries.getEpisodeBySelector(obj);
            } else if (source === "watchseries") {
                return watchseries.getEpisodeBySelector(obj);
            }
        }

        return {
            loadSerie: loadSerie,
            loadSeason: loadSeason,
            loadEpisode: loadEpisode,
            getStreamLinks: getStreamLinks,
            getEpisodeBySelector: getEpisodeBySelector,
            downloadEpisodeStreamLink: downloadEpisodeStreamLink,
            streamEpisodeStreamLink: streamEpisodeStreamLink
        }
    });





_define('goseries', [window, 'util', 'bringe', 'layout', 'downloads'], function (window, util, bringe, layout, downloads) {
    var seasonCallback;
    var episodeCallback;
    var base_url = "https://gostream.is";

    function failSeasonFunction() {
        seasonCallback(false, {site: "goseries"});
    }
    function failEpisodeFunction() {
        if (bringe.page != "serie") return;
        episodeCallback(false, {site: "goseries"});
    }

    function getSeasonData(sNo) {
        bringe.serie.websites.gomovies = bringe.serie.websites.gomovies || {};
        var gomovies = bringe.serie.websites.gomovies;
        gomovies.seasons = gomovies.seasons || [];
        var seasons = gomovies.seasons;
        var season = util.any(seasons, function (season) {
            if (season.seasonNo === sNo) {
                return season;
            }
        });
        if (season) {
            return season;
        }
        season = {seasonNo: sNo};
        gomovies.seasons.push(season);
        return season;
    }

    function getEpisodeData(sNo, epNo) {
        var seasonData = getSeasonData(sNo);
        seasonData.episodes = seasonData.episodes || [];
        var episodes = seasonData.episodes;
        var episode = util.any(episodes, function (episode) {
            if (episode.episodeNo === epNo) {
                return episode;
            }
        });
        if (episode) {
            return episode;
        }
        episode = {episodeNo: epNo};
        seasonData.episodes.push(episode);
        return episode;
    }

    function getLinkById(streams, id) {
        var link = null;
        link = util.any(streams, function (stream) {
            if(stream.id === id) {
                link = stream;
                return link;
            }
        });
        return link;
    }

    function isSameMovieName1(a, b) {
        a = a.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "");
        b = b.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "");
        return a == b;
    }

    function isSameMovieName2(a, b) {
        a = a.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        b = b.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        return a == b;
    }

    function isSameMovieName3(a, b) {
        a = a.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        b = b.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        return a == b;
    }

    function getMovies123SearchTerm(serieName, seasonNo) {
        var searchTerm = serieName;
        searchTerm = searchTerm.trim().toLowerCase().replace(/\(.*\)/, "").replace(".", "").replace(/^the/, "").replaceAll(/,| -|- |'/, " ");
        searchTerm = searchTerm.replace("part", "");
        searchTerm = searchTerm.replace(/\d*$/, "").trim().replaceAll(/\s+/, "+");
        searchTerm += "+-+Season+" + seasonNo;
        return searchTerm;
    }

    function getMovies123SearchedMovie(movieItems) {
        if (movieItems.length == 1) {
            return movieItems;
        }
        var movieItem, movieName,
            title = bringe.serie.title,
            seasonNo = bringe.season.seasonNo;
        for (var i = 0; i < movieItems.length; i++) {
            movieItem = movieItems[i];
            movieName = $(movieItem).find("a").attr("title");
            if (isSameMovieName1(movieName, title + " - Season " + seasonNo)) {
                return movieItem;
            }
        }
        for (i = 0; i < movieItems.length; i++) {
            movieItem = movieItems[i];
            movieName = $(movieItem).find("a").attr("title");
            if (isSameMovieName2(movieName, title + " - Season " + seasonNo)) {
                return movieItem;
            }
        }
        for (i = 0; i < movieItems.length; i++) {
            movieItem = movieItems[i];
            movieName = $(movieItem).find("a").attr("title");
            if (isSameMovieName3(movieName, title + " - Season " + seasonNo)) {
                return movieItem;
            }
        }
        failSeasonFunction();
    }

    function dataHandler(eid, seasonNo, episodeNo, result) {
        try {
            result = JSON.parse(result);
            if (result && result.playlist && result.playlist[0] && result.playlist[0].sources && result.playlist[0].sources.length > 0) {
                var sources = result.playlist[0].sources,
                    sourceList = [];
                for (var i = 0; i < sources.length; i++) {
                    var source = sources[i];
                    source.src = source.file;
                    source.res = source.res || parseInt(source.label);
                    if (!source.res) {
                        source.res = '-';
                        source.label = '-';
                    }
                    source.source = "goseries";
                    source.id = eid + '*' + source.res;
                    sourceList.push(source);
                }
                var episodeData = getEpisodeData(seasonNo, episodeNo);
                episodeData.streams = episodeData.streams || [];
                Array.prototype.push.apply(episodeData.streams, sourceList);
                layout.showEpisodeStreamLink();
                episodeCallback(true, {site: "goseries"});
            } else {
                failEpisodeFunction();
            }
        } catch (error) {
            failEpisodeFunction();
        }
    }

    function hashSuccessFunction(eid, seasonNo, episodeNo, result) {
        var parts = result.split(',');
        var x = parts[0].split("'")[1];
        var y = parts[1].split("'")[1];
        var link = base_url + '/ajax/movie_sources/' + eid + '?x=' + x + '&y=' + y;
        if (x && y) {
            util.sendAjax(link, "GET", {}, util.getProxy(dataHandler, [eid, seasonNo, episodeNo]), failEpisodeFunction);
        } else {
            failEpisodeFunction();
        }
    }

    function getMovies123MovieLinks(eids, seasonNo, episodeNo) {
        if (eids && eids.length > 0) {
            for (var i = 0; i < eids.length; i++) {
                var eid = eids[i];
                var link = base_url + '/ajax/movie_token?eid=' + eid + '&mid=' + getSeasonData(seasonNo).seasonId;
                util.sendAjax(link, "GET", {}, util.getProxy(hashSuccessFunction, [eid, seasonNo, episodeNo]), failEpisodeFunction);
            }
        } else {
            failEpisodeFunction();
        }
    }

    function getMovieId(url) {
        var parts = url.split("-");
        var part = parts[parts.length - 1];
        return part.split("/")[0];
    }

    function getEpisodeNoFromTitle(title) {
        var epPart = title.split(":")[0].split(" ");
        return parseInt(epPart[epPart.length - 1]);
    }

    function clearOldSeasonData(sNo) {
        var episodes = getSeasonData(sNo).episodes || [];
        util.each(episodes, function (episode) {
            delete episode.ids;
        });
    }

    function retrieveDataFromLink(link, seasonNo, serverId) {
        var title = $(link).attr("title"),
            linkId = $(link).attr("data-id"),
            episodeNo = getEpisodeNoFromTitle(title),
            episodeData;
        if (linkId && episodeNo) {
            episodeData = getEpisodeData(seasonNo, episodeNo);
            episodeData.ids = episodeData.ids || [];
            episodeData.ids.push(linkId);
            return true;
        }
        return false;
    }

    function episodesSuccessFunction(seasonNo, result) {
        if (bringe.page != "serie") return;
        try {
            var json = JSON.parse(result);
            var success = false;
            if (json.status) {
                var doc = new DOMParser().parseFromString(json.html, "text/html"),
                    myDoc = $(doc),
                    servers = myDoc.find(".le-server");
                clearOldSeasonData(seasonNo);
                if (servers.length > 0) {
                    for (var i = 0; i < servers.length; i++) {
                        var server = servers[i],
                            serverId = $(server).attr("data-id");
                        var title = $(server).find(".les-title").text();
                        if (title.indexOf("OpenLoad") !== -1) {
                            continue;
                        }
                        var links = $(server).find("a.btn-eps").toArray();
                        if (links) {
                            util.each(links, function (link) {
                                success = retrieveDataFromLink(link, seasonNo, serverId) || success;
                            });
                        }
                    }
                    seasonCallback(success, {site: "goseries"});
                    return;
                }
            }
            failSeasonFunction();
        } catch (ignore) {
            failSeasonFunction();
        }
    }

    function seasonPageSuccessFunction(seasonNo, result) {
        if (bringe.page != "serie") return;
        var doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc),
            url = myDoc.find(".fb-comments").attr("data-href"),
            movies123MovieId = getMovieId(url),
            movies123FetchLink = base_url + "/ajax/movie_episodes/" + movies123MovieId;
        getSeasonData(seasonNo).seasonId = movies123MovieId;
        util.sendAjax(movies123FetchLink, "GET", {}, util.getProxy(episodesSuccessFunction, [seasonNo]), failSeasonFunction);
    }

    function searchSuccessFunction(seasonNo, result) {
        if (bringe.page != "serie") return;
        var doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc);
        var movieItems = myDoc.find(".movies-list .ml-item");
        if (movieItems.length > 0) {
            var movieItem = getMovies123SearchedMovie(movieItems);
            if (movieItem) {
                var movies123MoviePageLink = $(movieItem).find("a").attr("href") + "watching.html";
                util.sendAjax(movies123MoviePageLink, "GET", {}, util.getProxy(seasonPageSuccessFunction, [seasonNo]), failSeasonFunction);
                return;
            }
        }
        failSeasonFunction();
    }

    function loadSeason(obj, func) {
        var serieName = obj.title,
            seasonNo = obj.seasonNo;
        seasonCallback = func;
        var searchName = getMovies123SearchTerm(serieName, seasonNo);
        var link = base_url + '/movie/search/' + searchName;
        util.sendAjax(link, "GET", {}, util.getProxy(searchSuccessFunction, [seasonNo]), failSeasonFunction);
    }

    function loadEpisode(obj, func) {
        episodeCallback = func;
        var seasonNo = obj.seasonNo,
            episodeNo = obj.episodeNo;
        var episodeData = getEpisodeData(seasonNo, episodeNo),
            ids = episodeData.ids;
        episodeData.streams = [];
        getMovies123MovieLinks(ids, seasonNo, episodeNo);
    }

    function getStreamLinks(obj) {
        var seasonNo = obj.seasonNo,
            episodeNo = obj.episodeNo;
        var episode = getEpisodeData(seasonNo, episodeNo);
        if (episode && episode.streams) {
            return episode.streams;
        } else {
            return null;
        }
    }

    function downloadEpisodeStreamLink(obj, callback) {
        var id = obj.id,
            seasonNo = obj.seasonNo,
            episodeNo = obj.episodeNo;
        var episode = getEpisodeData(seasonNo, episodeNo);
        if (episode && episode.streams) {
            var link = getLinkById(episode.streams, id);
            link = link.src;
            var name = bringe.episode.title;
            layout.openWaiter("Adding Episode to Downloads");
            downloads.addToDownload(link, name, ".mp4", function () {
                layout.closeWaiter();
                layout.shineDownloadButton();
            });
            return;
        }
        layout.closeWaiter();
    }
    function streamEpisodeStreamLink(obj, callback) {
        var id = obj.id,
            seasonNo = obj.seasonNo,
            episodeNo = obj.episodeNo;
        var episode = getEpisodeData(seasonNo, episodeNo);
        if (episode && episode.streams) {
            var link = getLinkById(episode.streams, id);
            link = link.src;
            chrome.tabs.create({'url': link}, function(tab) {});
        }
    }

    function getEpisodeBySelector(selector) {
        var id = selector.id,
            seasonNo = selector.seasonNo,
            episodeNo = selector.episodeNo;
        var episode = getEpisodeData(seasonNo, episodeNo);
        if (episode && episode.streams) {
            return getLinkById(episode.streams, id);
        }
    }

    return {
        loadSeason: loadSeason,
        loadEpisode: loadEpisode,
        getStreamLinks: getStreamLinks,
        getEpisodeBySelector: getEpisodeBySelector,
        downloadEpisodeStreamLink: downloadEpisodeStreamLink,
        streamEpisodeStreamLink: streamEpisodeStreamLink
    }
});









_define('fseries', [window, 'util', 'bringe', 'downloads', 'layout'], function (window, util, bringe, downloads, layout) {
    var seasonCallback,
        episodeCallback,
        base_url = "https://fmovies.is",
        ts;

    function failSeasonFunction() {
        seasonCallback(false, {site: "fseries"});
    }

    function failEpisodeFunction() {
        if (bringe.page != "serie") return;
        episodeCallback(false, {site: "fseries"});
    }

    function hashUrl(t, params) {

        var salt = 'bLeqpV';
        var y = ts;

        function r(t, params) {
            var e, i = /([^=\?&]+)(?:=([^&$]+))?/gi, n = {};
            if (t.indexOf('?') > -1) {
                do {
                    e = i.exec(t.url);
                    e && (n[e[1]] = decodeURIComponent(e[2] || '').replace(/\+/g, ' '));
                } while (e);
            }
            if (params) {
                do {
                    e = i.exec(params);
                    e && (n[e[1]] = decodeURIComponent(e[2] || '').replace(/\+/g, ' '));
                } while (e);
            }
            return n;
        }

        function a(t, e) {
            var i, n = 0;
            for (i = 0; i < Math.max(t.length, e.length); i++) {
                n += i < e.length ? e.charCodeAt(i) : 0;
                n += i < t.length ? t.charCodeAt(i) : 0;
            }
            return Number(n).toString(16);
        }

        function s(t) {
            var e, i = 0;
            for (e = 0; e < t.length; e++) {
                i += t.charCodeAt(e) * e;
            }
            return i;
        }

        function o(t) {
            var i, r, o = s(salt), l = {};
            r = t;
            r.ts = '' + y;
            for (i in r) {
                Object.prototype.hasOwnProperty.call(r, i) && (o += s(a(salt + i, r[i])));
            }
            l.ts = y;
            l._ = o;
            return l;
        }

        function d(t, e) {
            var i, n = '';
            for (i in e) {
                Object.prototype.hasOwnProperty.call(e, i) && (n += '&' + i + '=' + e[i]);
            }
            return t + (t.indexOf('?') < 0 ? '?' : '&') + n.substr(1);
        }

        var e = o(r(t, params));
        var x = d(t, e);
        return x + (x.indexOf('?') < 0 ? '?' : '&') + params;
    }

    function getSeasonData(sNo) {
        bringe.serie.websites.fmovies = bringe.serie.websites.fmovies || {};
        var fmovies = bringe.serie.websites.fmovies;
        fmovies.seasons = fmovies.seasons || [];
        var seasons = fmovies.seasons;
        var season = util.any(seasons, function (season) {
            if (season.seasonNo === sNo) {
                return season;
            }
        });
        if (season) {
            return season;
        }
        season = {seasonNo: sNo};
        fmovies.seasons.push(season);
        return season;
    }

    function getEpisodeData(sNo, epNo) {
        var seasonData = getSeasonData(sNo);
        seasonData.episodes = seasonData.episodes || [];
        var episodes = seasonData.episodes;
        var episode = util.any(episodes, function (episode) {
            if (episode.episodeNo === epNo) {
                return episode;
            }
        });
        if (episode) {
            return episode;
        }
        episode = {episodeNo: epNo};
        seasonData.episodes.push(episode);
        return episode;
    }

    function getLinkById(streams, id) {
        var link = null;
        link = util.any(streams, function (stream) {
            if (stream.id === id) {
                link = stream;
                return link;
            }
        });
        return link;
    }

    function isSameMovieName1(a, b) {
        a = a.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "");
        b = b.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "");
        return a == b;
    }

    function isSameMovieName2(a, b) {
        a = a.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        b = b.trim().toLowerCase().replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        return a == b;
    }

    function isSameMovieName3(a, b) {
        a = a.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        b = b.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        return a == b;
    }

    function getMovies123SearchTerm(serieName, seasonNo) {
        var searchTerm = serieName;
        searchTerm = searchTerm.trim().toLowerCase().replace(/\(.*\)/, "").replace(".", "").replace(/^the/, "").replaceAll(/,| -|- |'/, " ");
        searchTerm = searchTerm.replace("part", "");
        searchTerm = searchTerm.replace(/\d*$/, "").trim().replaceAll(/\s+/, "+");
        searchTerm += "+" + seasonNo;
        return searchTerm;
    }

    function getMovies123SearchedMovie(movieItems) {
        if (movieItems.length == 1) {
            return movieItems;
        }
        var movieItem, movieName,
            title = bringe.serie.title,
            seasonNo = bringe.season.seasonNo;
        for (var i = 0; i < movieItems.length; i++) {
            movieItem = movieItems[i];
            movieName = $(movieItem).html();
            if (isSameMovieName1(movieName, title + " " + seasonNo)) {
                return movieItem;
            }
        }
        for (i = 0; i < movieItems.length; i++) {
            movieItem = movieItems[i];
            movieName = $(movieItem).html();
            if (isSameMovieName2(movieName, title + " " + seasonNo)) {
                return movieItem;
            }
        }
        for (i = 0; i < movieItems.length; i++) {
            movieItem = movieItems[i];
            movieName = $(movieItem).html();
            if (isSameMovieName3(movieName, title + " " + seasonNo)) {
                return movieItem;
            }
        }
    }

    function cleanSpecialUrl(url) {
        return url.indexOf('?') > -1 ? url.substring(0, url.indexOf('?')) : url;
    }

    function getParamString(obj) {
        var str = "";
        util.each(obj, function (val, key) {
            str += "&" + key + "=" + val;
        });
        return str;
    }

    function dataHandler(id, seasonNo, episodeNo, subtitle, result) {
        try {
            result = JSON.parse(result);
            if (result && !result.error && result.data) {
                var sources = result.data,
                    sourceList = [];
                for (var i = 0; i < sources.length; i++) {
                    var source = sources[i];
                    source.src = source.file;
                    source.res = source.res || parseInt(source.label);
                    if (!source.res) {
                        source.res = '-';
                        source.label = '-';
                    }
                    source.source = "fseries";
                    source.id = "fm-" + id + '*' + source.res;
                    source.subtitles = [subtitle];
                    sourceList.push(source);
                }
                var episodeData = getEpisodeData(seasonNo, episodeNo);
                episodeData.streams = episodeData.streams || [];
                Array.prototype.push.apply(episodeData.streams, sourceList);
                layout.showEpisodeStreamLink();
                episodeCallback(true, {site: "fseries"});
            } else {
                failEpisodeFunction();
            }
        } catch (error) {
            failEpisodeFunction();
        }
    }

    function getMovieStreams(url, id, seasonNo, episodeNo, subtitle) {
        util.sendAjax(url, "GET", {}, util.getProxy(dataHandler, [id, seasonNo, episodeNo, subtitle]), failEpisodeFunction);
    }

    function episodesSuccessFunction(id, seasonNo, episodeNo, json) {
        if (bringe.page != "serie") return;
        try {
            json = JSON.parse(json);
        } catch (ignore) {
        }
        if (json.target) {
            json.target = cleanSpecialUrl(json.target);
            //dataHandler(index, json.subtitle, JSON.stringify({data: [{file: json.target}]}));
        } else if (json && json.grabber && json.params) {
            var url = hashUrl(json.grabber + getParamString(json.params), '');
            getMovieStreams(url, id, seasonNo, episodeNo, json.subtitle);
        }
        failEpisodeFunction();
    }

    function getMovies123MovieLinks(eids, seasonNo, episodeNo) {
        if (eids && eids.length > 0) {
            for (var i = 0; i < eids.length; i++) {
                var eid = eids[i];
                var link = hashUrl(base_url + '/ajax/episode/info', 'id=' + eid + '&update=0');
                util.sendAjax(link, "GET", {}, util.getProxy(episodesSuccessFunction, [i + 1, seasonNo, episodeNo]), failEpisodeFunction);
            }
        } else {
            failEpisodeFunction();
        }
    }

    function clearOldSeasonData(sNo) {
        var episodes = getSeasonData(sNo).episodes || [];
        util.each(episodes, function (episode) {
            delete episode.ids;
        });
    }

    function retrieveDataFromLink(link, seasonNo) {
        var linkId = $(link).attr("data-id"),
            episodeNo = parseInt($(link).html()),
            episodeData;
        if (linkId && episodeNo) {
            episodeData = getEpisodeData(seasonNo, episodeNo);
            episodeData.ids = episodeData.ids || [];
            episodeData.ids.push(linkId);
            return true;
        }
        return false;
    }

    function seasonPageSuccessFunction(seasonNo, result) {
        if (bringe.page != "serie") return;
        var success = false,
            doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc),
            servers = myDoc.find("#servers .server");
        clearOldSeasonData(seasonNo);
        if (servers.length > 0) {
            for (var i = 0; i < servers.length; i++) {
                var server = servers[i];
                var title = $(server).find("label").text().trim();
                if (title.indexOf("OpenLoad") !== -1 || title.indexOf("MyCloud") !== -1) {
                    continue;
                }
                var links = $(server).find("ul.episodes a").toArray();
                if (links) {
                    util.each(links, function (link) {
                        success = retrieveDataFromLink(link, seasonNo) || success;
                    });
                }
            }
            seasonCallback(success, {site: "fseries"});
            return;
        }
        failSeasonFunction();
    }

    function searchSuccessFunction(seasonNo, result) {
        if (bringe.page != "serie") return;
        var doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc);
        ts = myDoc.find("body").attr("data-ts");
        var movieItems = myDoc.find(".movie-list .item a.name");
        if (movieItems.length > 0) {
            var movieItem = getMovies123SearchedMovie(movieItems);
            if (movieItem) {
                var movies123MoviePageLink = base_url + $(movieItem).attr("href");
                util.sendAjax(movies123MoviePageLink, "GET", {}, util.getProxy(seasonPageSuccessFunction, [seasonNo]), failSeasonFunction);
                return;
            }
        }
        failSeasonFunction();
    }

    function loadSeason(obj, func) {
        var serieName = obj.title,
            seasonNo = obj.seasonNo;
        seasonCallback = func;
        var searchName = getMovies123SearchTerm(serieName, seasonNo);
        var link = base_url + '/search?keyword=' + searchName;
        util.sendAjax(link, "GET", {}, util.getProxy(searchSuccessFunction, [seasonNo]), failSeasonFunction);
    }

    function tsSuccessFunction(ids, seasonNo, episodeNo, result) {
        if (bringe.page != "serie") return;
        var doc = new DOMParser().parseFromString(result, "text/html"),
            myDoc = $(doc);
        ts = myDoc.find("body").attr("data-ts");
        getMovies123MovieLinks(ids, seasonNo, episodeNo);
    }

    function loadEpisode(obj, func) {
        episodeCallback = func;
        var seasonNo = obj.seasonNo,
            episodeNo = obj.episodeNo;
        var episodeData = getEpisodeData(seasonNo, episodeNo),
            ids = episodeData.ids;
        episodeData.streams = [];
        util.sendAjax(base_url, "GET", {}, util.getProxy(tsSuccessFunction, [ids, seasonNo, episodeNo]), failEpisodeFunction);
    }

    function getStreamLinks(obj) {
        var seasonNo = obj.seasonNo,
            episodeNo = obj.episodeNo;
        var episode = getEpisodeData(seasonNo, episodeNo);
        if (episode && episode.streams) {
            return episode.streams;
        } else {
            return null;
        }
    }

    function downloadEpisodeStreamLink(obj, callback) {
        var id = obj.id,
            seasonNo = obj.seasonNo,
            episodeNo = obj.episodeNo;
        var episode = getEpisodeData(seasonNo, episodeNo);
        if (episode && episode.streams) {
            var link = getLinkById(episode.streams, id);
            link = link.src;
            var name = bringe.episode.title;
            layout.openWaiter("Adding Episode to Downloads");
            downloads.addToDownload(link, name, ".mp4", function () {
                layout.closeWaiter();
                layout.shineDownloadButton();
            });
            return;
        }
        layout.closeWaiter();
    }

    function streamEpisodeStreamLink(obj, callback) {
        var id = obj.id,
            seasonNo = obj.seasonNo,
            episodeNo = obj.episodeNo;
        var episode = getEpisodeData(seasonNo, episodeNo);
        if (episode && episode.streams) {
            var link = getLinkById(episode.streams, id);
            link = link.src;
            chrome.tabs.create({'url': link}, function (tab) {
            });
        }
    }

    function getEpisodeBySelector(selector) {
        var id = selector.id,
            seasonNo = selector.seasonNo,
            episodeNo = selector.episodeNo;
        var episode = getEpisodeData(seasonNo, episodeNo);
        if (episode && episode.streams) {
            return getLinkById(episode.streams, id);
        }
    }

    return {
        loadSeason: loadSeason,
        loadEpisode: loadEpisode,
        getStreamLinks: getStreamLinks,
        getEpisodeBySelector: getEpisodeBySelector,
        downloadEpisodeStreamLink: downloadEpisodeStreamLink,
        streamEpisodeStreamLink: streamEpisodeStreamLink
    }
});







_define('watchseries', [window, 'util', 'bringe', 'downloads', 'layout'], function (window, util, bringe, downloads, layout) {
    var base_url = 'http://mywatchseries.to';

    function getSeasonByNo(no) {
        bringe.serie.websites.watchSeries = bringe.serie.websites.watchSeries || {};
        var watchSeries = bringe.serie.websites.watchSeries;
        var seasons = [],
            reqdSeason = null;
        if (watchSeries.seasons)
            seasons = watchSeries.seasons;
        util.each(seasons, function (season) {
            if (season.seasonNo === no) {
                reqdSeason = season;
            }
        });
        return reqdSeason;
    }
    function getEpisodeByNo(season, no) {
        var episodes = season.episodes,
            reqdEpisode = null;
        util.each(episodes, function (episode) {
            if (episode.episodeNo === no) {
                reqdEpisode = episode;
            }
        });
        return reqdEpisode;
    }
    function getEpisode(seasonNo, episodeNo) {
        var season = getSeasonByNo(seasonNo);
        if (season) {
            return getEpisodeByNo(season, episodeNo);
        }
    }

    function getLinkById(streams, id) {
        var link = null;
        link = util.any(streams, function (stream) {
            if(stream.id === id) {
                link = stream;
                return link;
            }
        });
        return link;
    }

    function getWatchSeriesSearchTerm(searchTerm) {
        searchTerm = searchTerm.trim().toLowerCase().replace(/\(.*\)/,"").replace(/^the/, "").replaceAll(/,| -|- /," ");
        searchTerm = searchTerm.replace(/\d*$/,"").replaceAll(/\s\s+/," ").trim();
        return searchTerm;
    }
    function getWorthyRows(rows) {
        rows = util.filter(rows, function (row) {
            if ($(row).attr("class").trim() === "download_link_gorillavid.in") {
                return true;
            }
            return false;
        });
        return rows;
    }
    function getPageId(str) {
        if (str && str!= "") {
            var arr = str.split("Delete link http://gorillavid.in/");
            return arr[1].split("'")[0];
        }
    }
    function getSearchedSerie(serieItems) {
        if(serieItems.length == 0) {
            return null;
        }
        if(serieItems.length == 1) {
            if (serieItems[0].label === "More results...") return null;
            return serieItems[0].seo_url;
        }
        if(serieItems.length == 2) {
            if (serieItems[1].label === "More results...") return serieItems[0].seo_url;
        }
        for(var i=0; i<serieItems.length; i++) {
            var serieItem = serieItems[i];
            var serieName = serieItem.value;
            if(util.isSameMovieName(serieName, thisSerie.title)) {
                return serieItem.seo_url;
            }
        }
        return null;
    }
    function getSeries() {
        bringe.serie.websites.watchSeries = bringe.serie.websites.watchSeries || {};
        var watchSeries = bringe.serie.websites.watchSeries;
        if (watchSeries.seo_url) {
            var link = base_url + '/serie/' + watchSeries.seo_url;
            $.ajax({
                url: link,
                success: function (result) {
                    if (bringe.page != "serie") return;
                    var parser = new DOMParser(),
                        doc = parser.parseFromString(result, "text/html"),
                        myDoc = $(doc),
                        seasonsList = [],
                        seasonNo,
                        episodeNo,
                        link,
                        i, j;
                    var seasons = myDoc.find("div[itemprop='season']");
                    for (i=0; i < seasons.length; i++) {
                        var list = $(seasons[i]).find("ul.listings");
                        var episodeList = list.find("li[itemprop='episode']"),
                            episodesList = [];
                        seasonNo = parseInt(list.attr("id").replace("listing_",""));
                        if (seasonNo > 0) {
                            var oneSeason = {seasonNo: seasonNo};
                            for (j = 0; j < episodeList.length; j++) {
                                var episode = $(episodeList[j]);
                                episodeNo = parseInt(episode.find("meta[itemprop='episodenumber']").attr("content"));
                                link = episode.find("meta[itemprop='url']").attr("content");
                                if (episodeNo > 0) {
                                    var oneEpisode = {episodeNo: episodeNo, link: link};
                                    episodesList.push(oneEpisode);
                                }
                            }
                            oneSeason.episodes = episodesList;
                            seasonsList.push(oneSeason);
                        }
                    }
                    watchSeries.seasons = seasonsList;
                }
            });
        }
    }
    function loadEpisodeLink(page, episode, id) {
        var link = "http://gorillavid.in/" + page.pageId,
            obj;
        $.ajax({
            url: link,
            data: {
                id: page.pageId,
                op: 'download1',
                method_free: 'Free Download'
            },
            method: "POST",
            success: function (result) {
                var parser = new DOMParser(),
                    doc = parser.parseFromString(result, "text/html"),
                    myDoc = $(doc),
                    link;
                var script = myDoc.find("#player_code script").last().text();
                var arr = script.split('file: "')[1];
                if (arr && arr!= '') {
                    link = arr.split('"')[0];
                    episode.streams = episode.streams || [];
                    obj = {src: link, res: "-", label: "-", source: "watchseries", id: id};
                    episode.streams.push(obj);
                    layout.showEpisodeStreamLink();
                }
            }
        });
    }
    function fetchEpisode(episode) {
        var link  = episode.link;
        delete episode.streams;
        $.ajax({
            url: link,
            success: function (result) {
                if (bringe.page != "serie") return;
                var parser = new DOMParser(),
                    doc = parser.parseFromString(result, "text/html"),
                    myDoc = $(doc);
                var rows = myDoc.find("table#myTable tr"),
                    id = 1;
                rows = getWorthyRows(rows);
                util.each(rows, function (row) {
                    var page = {};
                    page.linkId = $(row).attr("id").replace("link_", "");
                    page.redirector = $(row).find("td a.buttonlink").attr("href");
                    page.pageId = $(row).find("td.deletelinks a").attr("onclick") + "";
                    page.pageId = getPageId(page.pageId);
                    if (page.pageId && page.pageId != '') {
                        loadEpisodeLink(page, episode, id + '');
                        id++;
                    }
                });
            }
        });
    }
    function loadSerie(obj, callback) {
        var serieName = obj.title;
        var link = base_url + '/show/search-shows-json';
        $.ajax({
            url: link,
            data: {
                term: getWatchSeriesSearchTerm(serieName)
            },
            method: 'POST',
            success: function (result) {
                if (bringe.page != "serie") return;
                if (typeof result != "object") {
                    try {
                        result = JSON.parse(result);
                    } catch (e) {
                        result = {};
                    }
                }
                bringe.serie.websites.watchSeries = bringe.serie.websites.watchSeries || {};
                bringe.serie.websites.watchSeries.seo_url = getSearchedSerie(result);
                getSeries();
            }
        });
    }
    function loadEpisode(obj) {
        var seasonNo = obj.seasonNo,
            episodeNo = obj.episodeNo;
        var season = getSeasonByNo(seasonNo);
        if (season) {
            var episode = getEpisodeByNo(season, episodeNo);
            if (episode) {
                fetchEpisode(episode);
            }
        }
    }
    function getStreamLinks(obj) {
        var seasonNo = obj.seasonNo,
            episodeNo = obj.episodeNo;
        var episode = getEpisode(seasonNo, episodeNo);
        if (episode && episode.streams) {
            return episode.streams;
        } else {
            return null;
        }
    }
    function downloadEpisodeStreamLink(obj) {
        var id = obj.id,
            seasonNo = obj.seasonNo,
            episodeNo = obj.episodeNo;
        var episode = getEpisode(seasonNo, episodeNo);
        if (episode && episode.streams) {
            var link = getLinkById(episode.streams, id);
            link = link.src;
            var name = thisEpisode.title;
            layout.openWaiter("Adding Episode to Downloads");
            downloads.addToDownload(link, name, ".mp4", function () {
                layout.closeWaiter();
                layout.shineDownloadButton();
            });
            return;
        }
        layout.closeWaiter();
    }
    function streamEpisodeStreamLink(obj) {
        var id = obj.id,
            seasonNo = obj.seasonNo,
            episodeNo = obj.episodeNo;
        var episode = getEpisode(seasonNo, episodeNo);
        if (episode && episode.streams) {
            var link = getLinkById(episode.streams, id);
            link = link.src;
            chrome.tabs.create({'url': link}, function(tab) {});
        }
    }
    function getEpisodeBySelector(selector) {
        var id = selector.id,
            seasonNo = selector.seasonNo,
            episodeNo = selector.episodeNo;
        var episode = getEpisode(seasonNo, episodeNo);
        if (episode && episode.streams) {
            return getLinkById(episode.streams, id);
        }
    }
    return {
        loadSerie: loadSerie,
        loadEpisode: loadEpisode,
        getStreamLinks: getStreamLinks,
        getEpisodeBySelector: getEpisodeBySelector,
        downloadEpisodeStreamLink: downloadEpisodeStreamLink,
        streamEpisodeStreamLink: streamEpisodeStreamLink
    }
});








_define('downloads', [window, 'util', 'layout', 'bringe'], function (window, util, layout, bringe) {
    function setupDownloadsSection() {
        layout.setupDownloadSection();
    }
    function addToDownload(link, name, ext, callback) {
        chrome.downloads.setShelfEnabled(false);
        if(ext) {
            name += ext;
        }
        chrome.downloads.download({url: link, filename: "Bringe/" + name}, function (downloadId) {
            if (callback) {
                setTimeout(function() {
                    callback();
                }, 400);
            }
            setTimeout(function() {
                chrome.downloads.setShelfEnabled(true);
            }, 400);
        });
    }
    function reStartDownload(link, name) {
        addToDownload(link, name, "", function () {
            layout.placeDownloadSection();
        });
    }
    function getAndPlaceDownloadItemById(id, callback) {
        chrome.downloads.search({id: id}, function (results) {
            if(results.length > 0) {
                callback(results[0]);
            } else {
                return null;
            }
        });
    }
    function getAndPlaceDownloadItemIcon(id, iconBox, callback) {
        chrome.downloads.getFileIcon(id, function (iconUrl) {
            if(iconUrl) {
                callback(iconUrl, iconBox);
            } else {
                return null;
            }
        });
    }
    function getPauseButton(id) {
        var button = $('<div class="download-action-button pause-button">Pause</div>');
        button.click(function () {
            chrome.downloads.pause(id, function () {
                //reShowDownloadItem(id);
                //layout.placeDownloadSection();
            })
        });
        return button;
    }
    function getResumeButton(id) {
        var button = $('<div class="download-action-button resume-button">Resume</div>');
        button.click(function () {
            chrome.downloads.resume(id, function () {
            })
        });
        return button;
    }
    function getCancelButton(id) {
        var button = $('<div class="download-action-button cancel-button">Cancel</div>');
        button.click(function () {
            chrome.downloads.cancel(id, function () {
            })
        });
        return button;
    }
    function getRetryButton(item) {
        var button = $('<div class="download-action-button retry-button">Retry</div>');
        button.click(function () {
            if(bringe.downloadActive) {
                bringe.downloadActive = false;
                chrome.downloads.erase({id: item.id}, function (){
                });
                reStartDownload(item.url, util.extractFileName(item.filename))
            }
        });
        return button;
    }
    function getOpenButton(id) {
        var button = $('<div class="download-action-button open-button">Open File</div>');
        button.click(function () {
            chrome.downloads.open(id);
        });
        return button;
    }
    function getShowInFolderButton(id) {
        var button = $('<div class="download-action-button show-button">Show In Folder</div>');
        button.click(function () {
            chrome.downloads.show(id);
        });
        return button;
    }
    function getCompletedPercentage(completed, total) {
        return (completed/total)*100;
    }
    function getSizeInWords(bytes) {
        if(bytes<1024) {
            return bytes + "B";
        }
        var kb = Math.floor(bytes/1024);
        bytes = bytes % 1024;
        if (kb<10) {
            return kb + "." + Math.floor((bytes*100)/1024) + "kB";
        }
        if (kb<100) {
            return kb + "." + Math.floor((bytes*10)/1024) + "kB";
        }
        if (kb<1024) {
            return kb + "kB";
        }
        var mb = Math.floor(kb/1024);
        kb = kb % 1024;
        if (mb<10) {
            return mb + "." + Math.floor((kb*100)/1024) + "MB";
        }
        if (mb<100) {
            return mb + "." + Math.floor((kb*10)/1024) + "MB";
        }
        if (mb<1024) {
            return mb + "MB";
        }
        var gb = Math.floor(mb/1024);
        mb = mb % 1024;
        if (gb<10) {
            return gb + "." + Math.floor((mb*100)/1024) + "GB";
        }
        if (gb<100) {
            return gb + "." + Math.floor((mb*10)/1024) + "GB";
        }
        if (gb<1024) {
            return gb + "GB";
        }
    }
    return {
        addToDownload: addToDownload,
        setupDownloadsSection: setupDownloadsSection,
        getAndPlaceDownloadItemById : getAndPlaceDownloadItemById,
        getAndPlaceDownloadItemIcon: getAndPlaceDownloadItemIcon,
        getPauseButton: getPauseButton,
        getResumeButton: getResumeButton,
        getCancelButton: getCancelButton,
        getRetryButton: getRetryButton,
        getOpenButton: getOpenButton,
        getShowInFolderButton: getShowInFolderButton,
        getCompletedPercentage: getCompletedPercentage,
        getSizeInWords: getSizeInWords
    }
});








_define('player', [window], function (window) {
    var vid = {};
    $(document).ready(function () {

        var bringePlayer = $("#bringePlayer");
        var video = $("#player")[0];
        vid.video = video;
        vid.source = $("source");
        var playpause = $("#playpause");
        var rewind = $("#rewind");
        var forward = $("#forward");
        var mutebutton = $('#mutebutton');
        var volumecontrol = $('#volumecontrol');
        var fullscr = $("#fullscr");
        var seekbar = $('#seekbar')[0];
        var seekGroup = $('#seekGroup');
        var seenRange = $('#seenRange');
        var loadedRange = $('#loadedRange');
        var volumeSet = $('#volumeSet');

        var playerPopup = $("#playerPopup");
        var playerPlay = $("#playerPlay");
        var playerLoader = $("#playerLoader");
        var playerNotification = $("#playerNotification");

        var playIcon = $('<i class="fa fa-play" aria-hidden="true"></i>');
        var pauseIcon = $('<i class="fa fa-pause" aria-hidden="true"></i>');
        var muteButton = $('<i class="fa fa-volume-up" aria-hidden="true"></i>');
        var unmuteButton = $('<i class="fa fa-volume-off" aria-hidden="true"></i>');
        var fullScreenButton = $('<i class="fa fa-expand" aria-hidden="true"></i>');
        var smallScreenButton = $('<i class="fa fa-compress" aria-hidden="true"></i>');

        video.ondurationchange = setupSeekbar;
        video.onfullscreenchange = screenChangeHandle;
        video.onwebkitfullscreenchange = screenChangeHandle;
        video.onprogress = progressHandler;
        video.onpause = playpauseHandler;
        video.onplay = playpauseHandler;
        video.onended = videoEndHandler;
        video.onvolumechange = volumeChangeHandler;
        video.ontimeupdate = timeUpdateHandler;
        video.onwaiting = stalledHandler;
        video.onplaying = hideVideoLoader;
        seekbar.onchange = seekVideo;
        volumecontrol[0].onchange = updateVolume;

        playpause.click(function () {
            playVideo();
        });
        rewind.click(function () {
            rewindVideo(10);
        });
        forward.click(function () {
            forwardVideo(10);
        });
        mutebutton.click(function () {
            muteOrUnmute();
        });
        fullscr.click(function () {
            fullscrVideo();
        });
        playerPopup.click(function () {
            playVideo();
        });

        function playpauseHandler() {
            if (video.paused) {
                playpause.html(playIcon);
                showPlayPopup();
                hideVideoLoader();
            } else {
                playpause.html(pauseIcon);
                hidePlayPopup();
                if (video.readyState > 3) {
                    hideVideoLoader();
                } else {
                    stalledHandler();
                }
            }
        }

        function videoEndHandler() {
            playpause.html(playIcon);
        }

        function showPlayPopup() {
            playerPlay.show();
        }

        function hidePlayPopup() {
            playerPlay.hide();
        }

        function stalledHandler() {
            playerLoader.show();
        }

        function hideVideoLoader() {
            playerLoader.hide();
        }

        function volumeChangeHandler() {
            if (video.muted) {
                mutebutton.html(unmuteButton);
            } else {
                mutebutton.html(muteButton);
            }
            volumecontrol.val(video.volume);
            volumeSet.css("width", (video.volume * 100) + "%");
        }

        function isFullScreen() {
            return (document.fullScreenElement || document.webkitFullscreenElement);
        }

        function playVideo() {
            if ((video.ended || video.paused)) {
                var p = video.play();
                if (p && (typeof Promise !== 'undefined') && (p instanceof Promise)) {
                    p.catch(function(){});
                }
            } else {
                video.pause();
            }
        }

        function rewindVideo(value) {
            video.currentTime -= value;
        }

        function updateVolume() {
            video.volume = volumecontrol.val();
            video.muted = false;
        }

        function muteOrUnmute() {
            video.muted = !video.muted;
        }

        function forwardVideo(value) {
            video.currentTime += value;
        }

        function fullscrVideo() {
            if (document.fullScreenElement) {
                document.exitFullscreen();
            } else if (document.webkitFullscreenElement) {
                document.webkitExitFullscreen();
            } else {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                }
            }
        }

        function screenChangeHandle() {
            if (document.fullScreenElement || document.webkitFullscreenElement) {
                fullscr.html(smallScreenButton);
                bringePlayer.addClass("fullScreen");
            } else {
                fullscr.html(fullScreenButton);
                bringePlayer.removeClass("fullScreen");
                clearTimeout(timer);
                $('html').css({cursor: 'default'});
                $("#playerControls").show();
            }
        }

        function formatUnit(t) {
            if (t > 9) {
                return t;
            }
            return "0" + t;
        }

        function formatTime(t) {
            if (t < 0) t = 0;
            if (!t && t !== 0) return "";
            var sec = Math.floor(t);
            if (sec > 59) {
                var min = Math.floor(sec / 60);
                sec = sec % 60;
            }
            if (min > 59) {
                var hr = Math.floor(min / 60);
                min = min % 60;
            }
            if (hr > 0) {
                return formatUnit(hr) + ":" + formatUnit(min) + ":" + formatUnit(sec);
            }
            if (min > 0) {
                return formatUnit(min) + ":" + formatUnit(sec);
            }
            return "0:" + formatUnit(sec);
        }

        function onTrackedVideoFrame(currentTime, duration) {
            $("#currentTime").html(currentTime);
            $("#duration").html(" / " + duration);
        }

        function setupSeekbar() {
            seekbar.max = video.duration;
            seekbar.value = video.currentTime;
            volumecontrol.val(video.volume);
            volumeSet.css("width", (video.volume * 100) + "%");
        }

        function seekVideo() {
            video.currentTime = seekbar.value;
        }

        function timeUpdateHandler() {
            seekbar.value = video.currentTime;
            seenRange.css("width", (video.currentTime / video.duration) * 100 + "%");
            onTrackedVideoFrame(formatTime(this.currentTime), formatTime(this.duration));
        }

        function progressHandler() {
            var range = 0;
            var bf = this.buffered;
            var time = this.currentTime;
            var length = bf.length;
            if (!length && range >= length) return;

            while (!(bf.start(range) <= time && time <= bf.end(range))) {
                range += 1;
                if (range >= length) return;
            }
            var loadEndPercentage = (bf.end(range) / this.duration) * 100;
            loadedRange.css("width", loadEndPercentage + "%");
        }

        function calcSliderPos(e) {
            var pos = ((e.offsetX - 2) / (seekbar.clientWidth - 4)) * video.duration;
            if (pos < 0) return 0;
            if (pos > video.duration) return video.duration;
            return pos;
        }

        seekGroup.mousemove(function (e) {
            var valueHover = calcSliderPos(e);
            var textPart = $('#peekTimeText');
            textPart.html(formatTime(valueHover));
            textPart.show();
            textPart.css("left", Math.min(Math.max(20, (e.offsetX - (textPart[0].offsetWidth / 2))), (e.target.clientWidth - 60)));
            textPart.css("top", -20);
        });
        seekGroup.mouseleave(function (e) {
            var textPart = $('#peekTimeText');
            textPart.hide();
        });

        var timer, justHidden;
        $(document).mousemove(function () {
            if (!justHidden && isFullScreen()) {
                justHidden = false;
                $('html').css({cursor: 'default'});
                $("#playerControls").show();
                clearTimeout(timer);
                timer = setTimeout(hideControls, 4000);
            }
        });
        $(document).click(function () {
            if (!justHidden && isFullScreen()) {
                justHidden = false;
                $('html').css({cursor: 'default'});
                $("#playerControls").show();
                clearTimeout(timer);
                timer = setTimeout(hideControls, 4000);
            }
        });
        function hideControls() {
            if (isFullScreen()) {
                $('html').css({cursor: 'none'});
                $("#playerControls").hide();
                justHidden = true;
                setTimeout(function () {
                    justHidden = false;
                }, 500);
            }
        }
    });

    function setupVideo(obj) {
        vid.src = obj.src || "https://r4---sn-np2a-cvhz.googlevideo.com/videoplayback?id=b4fe0bba2d927538&itag=37&source=webdrive&requiressl=yes&ttl=transient&pl=24&ei=AcANWbLVEMHrqAXA1rhA&mime=video/mp4&lmt=1471607177524821&ip=27.106.9.245&ipbits=0&expire=1494087745&sparams=ei,expire,id,ip,ipbits,itag,lmt,mime,mm,mn,ms,mv,pcm2cms,pl,requiressl,source,ttl&signature=211E3ADE91C5FA6759B42997DACBBA2CAE0949F3.11A8AE12A3389D6F82CF990E7334053B555DD796&key=cms1&app=explorer&cms_redirect=yes&mm=31&mn=sn-np2a-cvhz&ms=au&mt=1494074246&mv=m&pcm2cms=yes";
        vid.type = obj.type || "video/mp4";
        vid.poster = obj.poster;
        vid.source.attr("src", vid.src);
        vid.source.attr("type", vid.type);
        if (obj.poster) {
            $(vid.video).attr("poster", obj.poster);
        }
        vid.video.load();
    }

    function removeVideo() {
        delete vid.src;
        delete vid.type;
        delete vid.poster;
        vid.video.currentTime = 0;
        vid.source.attr("src", "");
        vid.source.attr("type", "");
        $(vid.video).attr("poster", "");
        $("#playerLoader").hide();
        $("#playerPlay").show();
        $("#playpause").html($('<i class="fa fa-play" aria-hidden="true"></i>'));
        $('#seenRange').css("width", "0");
        $("#loadedRange").css("width", "0");
        vid.video.load();
    }

    return {
        setupVideo: setupVideo,
        removeVideo: removeVideo
    }
});











_define('manager', [window, 'util', 'bringe', 'layout', 'rottenTomatoes', 'series', 'subscene', 'imdb', 'movies', 'downloads', 'player', 'google', 'trailer'],
    function (window, util, bringe, layout, rottenTomatoes, series, subscene, imdb, movies, downloads, player, google, trailer) {
        function searchEntered() {
            var handleSearchResult = function (success, result) {
                layout.removeSearchBuffer();
                if (success) {
                    if (result.movieCount || result.tvCount) {
                        if (result.movieCount) {
                            var movies = result.movies;
                            bringe.searchResults.movies = movies;
                            layout.placeMoviesList(movies);
                            layout.setMovieListVisible();
                        } else {
                            layout.setSerieListVisible();
                        }
                        if (result.tvCount) {
                            var series = result.tvSeries;
                            bringe.searchResults.series = series;
                            layout.placeSeriesList(series);
                        }
                        layout.hideTrending();
                    } else {
                        layout.hideTrending();
                        layout.showSearchResultText("No results found.");
                    }
                } else {
                    layout.hideTrending();
                    layout.showSearchResultText("Could not fetch search results.");
                }
            };
            layout.clearSearchList();
            var q = $("#search-input").val();
            if (q != "") {
                rottenTomatoes.searchMovie(q, handleSearchResult);
                layout.searching();
            }
        }

        function fetchTrendingMovies() {
            function fetchSuccessFunction(result) {
                try {
                    result = JSON.parse(result);
                } catch (ignore) {
                }
                if (result.results && result.results.length > 0) {
                    window.trending = window.trending || {};
                    window.trending.movies = result.results;
                    layout.showTrendingMovies(window.trending.movies);
                }
            }

            function failFunction() {

            }

            var url = "https://www.rottentomatoes.com/api/private/v2.0/browse";
            var params = {
                maxTomato: 100,
                maxPopcorn: 100,
                certified: 'true',
                sortBy: 'popularity',
                type: 'cf-in-theaters'
            };
            util.sendAjax(url, "GET", params, fetchSuccessFunction, failFunction);
        }

        function getMovie(index) {
            function setupThisMovie(movie) {
                var theMovie = {name: movie.name, title: movie.name, subline: movie.subline, year: movie.year};
                theMovie.ratings = {meterScore: movie.meterScore};
                theMovie.images = {thumbnail: movie.image};
                return theMovie;
            }

            function handleRottenLoaded(success, movie) {
                if (success) {
                    bringe.movie = bringe.movie || {};
                    var thisMovie = bringe.movie;
                    thisMovie.rotten = {link: movie.rottenlink};
                    thisMovie.cast = movie.cast;
                    thisMovie.images.coverImage = movie.coverImage;
                    thisMovie.images.image = movie.image;
                    thisMovie.infoList = movie.infoList;
                    thisMovie.ratings.audienceScore = movie.audienceScore;
                    thisMovie.synopsis = movie.movieSynopsis;
                    layout.showRTMovie();
                } else {
                    layout.goToHome();
                    layout.showSearchResultText("Couldn't fetch data.");
                }
            }

            function handleSubtitleLoad(success, subtitle) {
                if (success) {
                    bringe.movie = bringe.movie || {};
                    var thisMovie = bringe.movie;
                    thisMovie.subtitleLinks = thisMovie.subtitleLinks || [];
                    var len = thisMovie.subtitleLinks.length;
                    subtitle.index = len;
                    thisMovie.subtitleLinks.push(subtitle);
                    if (len == 0) {
                        layout.showSubtitleLink();
                    }
                }
            }

            function handleTrailerLoad(success, id) {
                if (success) {
                    bringe.movie.trailer = bringe.movie.trailer || {};
                    var trailer = bringe.movie.trailer;
                    trailer.youtube = trailer.youtube || {};
                    trailer.youtube.id = trailer.youtube.id || {};
                    trailer.youtube.id.google = id;
                    layout.showMovieTrailerLink();
                }
            }

            function handleImdbLoaded(success, movie) {
                bringe.movie = bringe.movie || {};
                var thisMovie = bringe.movie;
                thisMovie.ratings.imdbRating = movie.imdbRating;
                thisMovie.ratings.metaRating = movie.metaRating;
                thisMovie.imdb = {id: movie.imdbId};
                if (success) {
                    layout.placeImdbMovieRating();
                }
            }

            function handleGoogleLoaded(success, movie) {
                if (success) {
                    bringe.movie.reviews = movie.reviews;
                    bringe.movie.social = movie.social;
                    layout.placeGoogleMovieData();
                }
            }

            if (bringe.searchResults.movies[index]) {
                layout.hideAllSection();
                var movie = bringe.searchResults.movies[index];
                bringe.movie = setupThisMovie(movie);
                layout.showRottenLoader($(".movie-wrapper"));
                layout.showMoviePart();
                rottenTomatoes.getMovie(movie, handleRottenLoaded);
                imdb.searchMovie(movie.name, movie.year, handleImdbLoaded);
                google.searchMovie(movie.name, movie.year, handleGoogleLoaded);
                trailer.fetchMovieTrailer(movie.name, movie.year, handleTrailerLoad);
                movies.loadMovies();
                subscene.searchMovieSubtitle(movie.name, movie.year, handleSubtitleLoad);
            }
        }

        function getTrendingMovie(index) {
            function setupThisMovie(movie) {
                var theMovie = {name: movie.title, title: movie.title};
                theMovie.ratings = {meterScore: movie.tomatoScore};
                var image = movie.posters && movie.posters.primary;
                theMovie.images = {thumbnail: image};
                return theMovie;
            }

            function handleRottenLoaded(success, movie) {
                if (success) {
                    bringe.movie = bringe.movie || {};
                    var thisMovie = bringe.movie;
                    thisMovie.rotten = {link: movie.rottenlink};
                    thisMovie.cast = movie.cast;
                    thisMovie.images.coverImage = movie.coverImage;
                    thisMovie.images.image = movie.image;
                    thisMovie.infoList = movie.infoList;
                    thisMovie.ratings.audienceScore = movie.audienceScore;
                    thisMovie.synopsis = movie.movieSynopsis;
                    thisMovie.year = movie.year;
                    imdb.searchMovie(thisMovie.name, thisMovie.year, handleImdbLoaded);
                    google.searchMovie(thisMovie.name, thisMovie.year, handleGoogleLoaded);
                    trailer.fetchMovieTrailer(thisMovie.name, thisMovie.year, handleTrailerLoad);
                    movies.loadMovies();
                    subscene.searchMovieSubtitle(thisMovie.name, thisMovie.year, handleSubtitleLoad);
                    layout.showRTMovie();
                } else {
                    layout.goToHome();
                    layout.showSearchResultText("Couldn't fetch data.");
                }
            }

            function handleSubtitleLoad(success, subtitle) {
                if (success) {
                    bringe.movie = bringe.movie || {};
                    var thisMovie = bringe.movie;
                    thisMovie.subtitleLinks = thisMovie.subtitleLinks || [];
                    var len = thisMovie.subtitleLinks.length;
                    subtitle.index = len;
                    thisMovie.subtitleLinks.push(subtitle);
                    if (len == 0) {
                        layout.showSubtitleLink();
                    }
                }
            }

            function handleTrailerLoad(success, id) {
                if (success) {bringe.movie = bringe.movie || {};
                    var thisMovie = bringe.movie;
                    thisMovie.trailer = thisMovie.trailer || {};
                    thisMovie.trailer.youtube = thisMovie.trailer.youtube || {};
                    thisMovie.trailer.youtube.id = thisMovie.trailer.youtube.id || {};
                    thisMovie.trailer.youtube.id.google = id;
                    layout.showMovieTrailerLink();
                }
            }

            function handleImdbLoaded(success, movie) {
                bringe.movie = bringe.movie || {};
                var thisMovie = bringe.movie;
                thisMovie.ratings.imdbRating = movie.imdbRating;
                thisMovie.ratings.metaRating = movie.metaRating;
                thisMovie.imdb = {id: movie.imdbId};
                if (success) {
                    layout.placeImdbMovieRating();
                }
            }

            function handleGoogleLoaded(success, movie) {
                if (success) {
                    bringe.movie.reviews = movie.reviews;
                    bringe.movie.social = movie.social;
                    layout.placeGoogleMovieData();
                }
            }

            if (window.trending.movies[index]) {
                layout.hideAllSection();
                var movie = window.trending.movies[index];
                bringe.movie = setupThisMovie(movie);
                layout.showRottenLoader($(".movie-wrapper"));
                layout.showMoviePart();
                rottenTomatoes.getMovie(movie, handleRottenLoaded);
            }
        }

        function getSerie(index) {
            function handleRottenLoaded(success) {
                if (success) {
                    layout.showRTSerie();
                }
            }

            function handleImdbLoaded(success) {
                if (success) {
                    layout.placeImdbSerieRating();
                }
            }

            function getSeasonNumber(link) {
                if (link[link.length - 1] === '/') {
                    link = link.slice(0, -1);
                }
                var parts = link.split("/"),
                    seasonPart = parts[parts.length - 1],
                    no;
                if (seasonPart[0] === 's') {
                    no = parseInt(seasonPart.substr(1));
                    if (no > 0) {
                        return no;
                    }
                }
                return null;
            }

            if (bringe.searchResults.series[index]) {
                layout.hideAllSection();
                bringe.serieLevel = "serie";
                var serie = bringe.searchResults.series[index],
                    rottenLink = "http://www.rottentomatoes.com" + serie.url,
                    seasonNumber = getSeasonNumber(rottenLink);
                if (seasonNumber) {
                    layout.clearAllSeasonData();
                    bringe.serie = {};
                    var thisSerie = bringe.serie;
                    thisSerie.seasons = [];
                    thisSerie.websites = {};
                    thisSerie.startYear = serie.startYear;
                    thisSerie.onlySeason = true;
                    var season = {};
                    season.seasonNo = seasonNumber;
                    thisSerie.title = serie.title;
                    season.title = serie.title;
                    season.image = serie.image;
                    season.info = serie.startYear || serie.endYear;
                    season.links = {};
                    season.ratings = {};
                    season.links.rotten = "http://www.rottentomatoes.com" + serie.url;
                    season.ratings.rotten = serie.meterValue;
                    thisSerie.seasons.push(season);
                    series.loadSerie();
                    getSeason(0);
                    return;
                }
                bringe.serie = {};
                thisSerie = bringe.serie;
                thisSerie.title = serie.title;
                thisSerie.startYear = serie.startYear;
                thisSerie.endYear = serie.endYear;
                thisSerie.thumbnail = serie.image;
                thisSerie.ratings = thisSerie.ratings || {};
                thisSerie.ratings.rotten = serie.meterValue;
                thisSerie.links = thisSerie.links || {};
                thisSerie.links.rotten = rottenLink;
                thisSerie.websites = {};
                layout.showRottenLoader($(".serie-wrapper"));
                layout.showSeriePart();
                rottenTomatoes.getSerie(thisSerie, handleRottenLoaded);
                imdb.searchSerie(thisSerie.title, handleImdbLoaded);
                series.loadSerie();
            }
        }

        function getSeason(index) {
            function handleRottenLoaded(success) {
                if (success) {
                    layout.showRTSeasonData();
                }
            }

            function handleEpisodesLoaded(success) {
                if (success) {
                    layout.showRTEpisodesList();
                }
            }

            function handleTrailerLoad(success, id) {
                if (success) {
                    bringe.season.youtubeId = id;
                }
            }

            if (bringe.serie.seasons && bringe.serie.seasons[index]) {
                layout.hideAllSection();
                layout.clearAllSeasonData();
                bringe.serieLevel = "season";
                bringe.season = bringe.serie.seasons[index];
                bringe.serie.seasonNo = bringe.season.seasonNo;
                layout.showRottenLoader($(".serie-wrapper"));
                layout.showSeriePart();
                rottenTomatoes.getSeason(bringe.season, handleRottenLoaded, handleEpisodesLoaded);
                trailer.fetchSeasonTrailer(bringe.serie, bringe.serie.seasonNo, handleTrailerLoad);
                if (bringe.serie.metaData && bringe.serie.metaData.imdbId) {
                    imdb.loadEpisodes(bringe.serie.metaData.imdbId, bringe.serie.seasonNo);
                }
                series.loadSeason();
            }
        }

        function getEpisode(index) {
            function handleRottenLoaded(success) {
                if (success) {
                    layout.showRTEpisodeData();
                }
            }

            function handleSubtitleLoad(success) {
                if (success) {
                    layout.showEpisodeSubtitleLink();
                }
            }

            if (bringe.season.episodes && bringe.season.episodes[index]) {
                layout.hideAllSection();
                layout.clearAllEpisodeData();
                bringe.serieLevel = "episode";
                bringe.episode = bringe.season.episodes[index];
                bringe.serie.episodeNo = bringe.episode.episodeNo;
                layout.showRottenLoader($(".serie-wrapper"));
                layout.showSeriePart();
                rottenTomatoes.getEpisode(bringe.episode, handleRottenLoaded);
                series.loadEpisode();
                subscene.searchSubtitle(handleSubtitleLoad);
                if (bringe.season.youtubeId) {
                    layout.showEpisodeTrailerLink();
                }
            }
        }

        function openMovieStreamLink(selector) {
            if (selector && selector.id) {
                var movie = movies.getMovieBySelector(selector);
                if (movie) {
                    var obj = {src: movie.src};
                    if (bringe.movie.coverImage && bringe.movie.coverImage != "") {
                        obj.poster = bringe.movie.coverImage;
                    }
                    player.setupVideo(obj);
                    layout.openVideoPopup();
                }
            }
        }

        function downloadMovieStreamLink(obj) {
            movies.downloadMovieStreamLink(obj);
        }

        function downloadMovieSubtitle(id) {
            layout.openWaiter("Adding Subtitle to Downloads");
            downloads.addToDownload(bringe.movie.subtitleLinks[id].link, bringe.movie.name, ".zip", function () {
                layout.closeWaiter();
                layout.shineDownloadButton();
            });
        }

        function downloadEpisodeSubtitle(id) {
            layout.openWaiter("Adding Subtitle to Downloads");
            downloads.addToDownload(subscene.getSubtitleEpisode().links[id].link, bringe.serie.title, ".zip", function () {
                layout.closeWaiter();
                layout.shineDownloadButton();
            });
        }

        function openSerieStreamLink(selector) {
            if (selector && selector.id && selector.source)
                var episode = series.getEpisodeBySelector(selector);
            if (episode) {
                var obj = {src: episode.src};
                if (bringe.serie.coverImage && bringe.serie.coverImage != "") {
                    obj.poster = bringe.serie.coverImage;
                }
                player.setupVideo(obj);
                layout.openVideoPopup();
            }
        }

        function downloadSerieStreamLink(obj) {
            series.downloadEpisodeStreamLink(obj);
        }

        function openMovieStreamPopup() {
            layout.openMovieStreamPopup(bringe.movie);
        }

        function openMovieSubtitlePopup() {
            layout.openMovieSubtitlePopup(bringe.movie);
        }

        function openEpisodesStreamPopup() {
            var streamLinks = series.getStreamLinks();
            layout.openEpisodesStreamPopup(streamLinks);
        }

        function openEpisodesSubtitlePopup() {
            var episode = subscene.getSubtitleEpisode() || {};
            layout.openEpisodesSubtitlePopup(episode);
        }

        function openMovieTrailer() {
            if (bringe.movie.trailer && bringe.movie.trailer.youtube && bringe.movie.trailer.youtube.id) {
                if (bringe.movie.trailer.youtube.id.watchit) {
                    layout.openTrailerPopup();
                    trailer.setupYoutube(bringe.movie.trailer.youtube.id.watchit);
                } else if (bringe.movie.trailer.youtube.id.google) {
                    layout.openTrailerPopup();
                    trailer.setupYoutube(bringe.movie.trailer.youtube.id.google);
                }
            }
        }

        function openSeasonTrailer() {
            if (bringe.season.youtubeId) {
                layout.openTrailerPopup();
                trailer.setupYoutube(bringe.season.youtubeId);
            }
        }

        function searchOnGoogle(q) {
            q = q.replace(/ /g, '+');
            var url = "https://www.google.com/search?q=" + q;
            background.openLinkInBrowser(url);
        }

        function closeVideo() {
            layout.closeVideoPopup();
            player.removeVideo();
        }

        function closeYoutube() {
            layout.closeTrailerPopup();
            trailer.removeYoutube();
        }

        return {
            searchEntered: searchEntered,
            fetchTrendingMovies: fetchTrendingMovies,
            getMovie: getMovie,
            getTrendingMovie: getTrendingMovie,
            getSerie: getSerie,
            getSeason: getSeason,
            getEpisode: getEpisode,
            openMovieStreamLink: openMovieStreamLink,
            openMovieTrailer: openMovieTrailer,
            openSeasonTrailer: openSeasonTrailer,
            downloadMovieStreamLink: downloadMovieStreamLink,
            downloadMovieSubtitle: downloadMovieSubtitle,
            downloadEpisodeSubtitle: downloadEpisodeSubtitle,
            openSerieStreamLink: openSerieStreamLink,
            downloadSerieStreamLink: downloadSerieStreamLink,
            openMovieStreamPopup: openMovieStreamPopup,
            openMovieSubtitlePopup: openMovieSubtitlePopup,
            openEpisodesStreamPopup: openEpisodesStreamPopup,
            openEpisodesSubtitlePopup: openEpisodesSubtitlePopup,
            searchOnGoogle: searchOnGoogle,
            closeVideo: closeVideo,
            closeYoutube: closeYoutube
        }
    });










var background = chrome.extension.getBackgroundPage();
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

_define('util', [window], function (window) {
    var eventsRegistered = {};

    function isSameMovieName(a, b) {
        a = a.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        b = b.trim().toLowerCase().replace(/\(.*\)/, "").replaceAll(" ", "").replaceAll(/:|,|-|'|"|\(|\)/, "").replace("the", "");
        return a == b;
    }

    function streamComparator(a, b) {
        if (a.res) {
            if (b.res) {
                if (a.res > b.res) {
                    return -1;
                }
                if (b.res > a.res) {
                    return 1;
                }
                return 0;
            } else {
                return -1;
            }
        } else {
            return 1;
        }
    }

    function getSearchTerm(searchTerm) {
        searchTerm = searchTerm.trim().toLowerCase().replace(/\(.*\)/, "").replace(/^the/, "").replaceAll(/,| -|- /, " ");
        searchTerm = searchTerm.replace("part", "");
        searchTerm = searchTerm.replace(/\d*$/, "").replaceAll(/\s\s+/, " ").trim().replaceAll(" ", "+");
        return searchTerm;
    }

    function extractFileName(loc) {
        var name = loc.split("/");
        return name[name.length - 1];
    }

    function getTimeInWords(ms) {
        var time = Math.round(ms / 1000);
        if (time < 60) return time + " sec";
        time = Math.round(time / 60);
        if (time < 60) return time + " min";
        time = Math.round(time / 60);
        if (time < 24) return time + " hour";
        time = Math.round(time / 24);
        return time + " day";
    }

    function downloadComparator(a, b) {
        if (a.startTime < b.startTime) return 1;
        if (b.startTime < a.startTime) return -1;
        return 0;
    }

    function sendAjax(link, type, data, successFunction, errorFunction, headers) {
        headers = headers || {};
        $.ajax({
            url: link,
            type: type,
            data: data,
            headers: headers,
            success: function (result) {
                successFunction(result);
            },
            error: function (result) {
                errorFunction(result);
            }
        });
    }

    function isSet(val) {
        switch (typeof val) {
            case "string":
                return val !== undefined && val !== "" && val !== null;
            case "object":
                return val !== null;
            case "number":
            case "boolean":
                return true;
            default:
                return false;
        }
    }

    function isFunction(reference) {
        return typeof reference === "function";
    }

    function isArray(item) {
        return Object.prototype.toString.call(item) === '[object Array]';
    }

    function each(obj, callback) {
        var i, key;
        if (obj) {
            if (obj.constructor === Array) {
                for (i = 0; i < obj.length; i++) {
                    callback(obj[i], i, obj.length);
                }
            } else if (typeof obj === 'object') {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        callback(obj[key], key);
                    }
                }
            }
        }
    }

    function filter(arr, callback) {
        var array = [],
            i;
        if (arr) {
            for (i = 0; i < arr.length; i++) {
                if (callback(arr[i])) array.push(arr[i]);
            }
        }
        return array;
    }

    function any(obj, callback) {
        if (!isSet(obj)) {
            return;
        }
        if (!isFunction(callback)) {
            callback = function (val, key) {
                return !!val;
            };
        }
        var i = 0,
            length = obj.length,
            returnValue;

        if (isArray(obj)) {
            for (; i < length; i++) {
                returnValue = callback.call(obj[i], obj[i], i);
                if (isSet(returnValue)) {
                    return returnValue;
                }
            }
        } else {
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    returnValue = callback.call(obj[i], obj[i], i);
                    if (isSet(returnValue)) {
                        return returnValue;
                    }
                }
            }
        }
    }

    function getProxy(target, args, scope) {
        scope = scope || null;
        args = args || [];
        return function () {
            var argsCopy = args.slice(0);
            if (arguments.length > 0) {
                Array.prototype.push.apply(argsCopy, Array.prototype.slice.call(arguments));
            }
            target.apply(scope, argsCopy);
        };
    }

    function fireEvent(eventName, args) {
        if (eventsRegistered[eventName]) {
            var func = getProxy(eventsRegistered[eventName], args);
            func();
        }
    }

    function listenEvent(eventName, func) {
        eventsRegistered[eventName] = func;
    }

    function removeEvent(eventName) {
        delete eventsRegistered[eventName];
    }

    return {
        isSameMovieName: isSameMovieName,
        streamComparator: streamComparator,
        getSearchTerm: getSearchTerm,
        extractFileName: extractFileName,
        getTimeInWords: getTimeInWords,
        downloadComparator: downloadComparator,
        sendAjax: sendAjax,
        isFunction: isFunction,
        isSet: isSet,
        isArray: isArray,
        each: each,
        any: any,
        filter: filter,
        getProxy: getProxy,
        fireEvent: fireEvent,
        listenEvent: listenEvent,
        removeEvent: removeEvent
    }
});

_define('bringe', [window], function (window) {
    var thisMovie = {}, thisSerie = {}, thisSeason = {}, thisEpisode = {}, serieLevel = {},
        page = 'home', searchResults = {};
    return {
        movie: thisMovie,
        serie: thisSerie,
        season: thisSeason,
        episode: thisEpisode,
        serieLevel: serieLevel,
        page: page,
        downloadActive: true,
        searchResults: searchResults
    }
});

_define('handler', [window, document, 'util', 'manager', 'layout', 'downloads'], function (window, document, util, manager, layout, downloads) {
    function documentReady() {
        background.setSearchFunction(function (text) {
            $("#search-input").val(text);
            manager.searchEntered();
        });

        $(window).scroll(function () {
            if ($(this).scrollTop() > 80) {
                $('.header-wrapper').addClass("sticky");
            }
            else {
                $('.header-wrapper').removeClass("sticky");
            }
        });

        $("#search-input").focus();

        $(".header-logo").click(function () {
            layout.goToHome();
        });
        $(".close-button").click(function () {
            background.closeWindow();
        });
        $(".reopen").click(function () {
            background.reopenWindow();
        });
        $("#searchForm")[0].onsubmit = function (evt) {
            manager.searchEntered();
            return false;
        };
        $(".popup-close").click(function () {
            layout.closePopup();
        });
        $("#moviesResultsButton").click(function () {
            layout.setMovieListVisible();
        });
        $("#seriesResultsButton").click(function () {
            layout.setSerieListVisible();
        });
        $("#route-serie").click(function () {
            layout.showSerieLevel();
        });
        $("#route-season").click(function () {
            layout.showSeasonLevel();
        });
        $("#episodeStreamButton").find(".feeling-lucky").click(function (evt) {
            manager.openEpisodesStreamPopup();
        });
        $("#episodeSubtitleButton").find(".feeling-lucky").click(function (evt) {
            manager.openEpisodesSubtitlePopup();
        });
        $("#episodeTrailerButton").find(".feeling-lucky").click(function (evt) {
            manager.openSeasonTrailer();
        });

        $("#movieTrailerButton").find(".feeling-lucky").click(function (evt) {
            manager.openMovieTrailer();
        });
        $("#movieStreamButton").find(".feeling-lucky").click(function (evt) {
            manager.openMovieStreamPopup();
        });
        $("#movieSubtitleButton").find(".feeling-lucky").click(function (evt) {
            manager.openMovieSubtitlePopup();
        });
        $(".video-closer").click(function (evt) {
            manager.closeVideo();
        });
        $(".youtube-closer").click(function (evt) {
            manager.closeYoutube();
        });
        $("#downloads-button").click(function (evt) {
            downloads.setupDownloadsSection();
        });

        $(".downloads-back").click(function (evt) {
            layout.goBackFromDownloads();
        });

        manager.fetchTrendingMovies();

        util.listenEvent("getMovie", manager.getMovie);
        util.listenEvent("getSerie", manager.getSerie);
        util.listenEvent("getSeason", manager.getSeason);
        util.listenEvent("getEpisode", manager.getEpisode);
        util.listenEvent("openMovieStream", manager.openMovieStreamLink);
        util.listenEvent("downloadMovieStream", manager.downloadMovieStreamLink);
        util.listenEvent("downloadMovieSubtitle", manager.downloadMovieSubtitle);
        util.listenEvent("openSerieStream", manager.openSerieStreamLink);
        util.listenEvent("downloadSerieStream", manager.downloadSerieStreamLink);
        util.listenEvent("downloadEpisodeSubtitle", manager.downloadEpisodeSubtitle);
        util.listenEvent("getTrendingMovies", manager.getTrendingMovie);
        util.listenEvent("searchOnGoogle", manager.searchOnGoogle);
    }

    return {
        documentReady: documentReady
    }
});

$(document).ready(function () {
    var handler = _require(['handler'])[0];
    handler.documentReady();
});
