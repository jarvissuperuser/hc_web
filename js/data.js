var data = {
    target: {
        title: ".title h2 p",
        content: ".content",
        footer_l: ".footer h4.w3-left",
        footer_r: ".footer h4.w3-right"
    },
    d: undefined,
    cards: undefined,
    do_: function(start, dtyp, t, end) {
        // **  setup
        $("section").empty();
        var c = 0;
        var startAt = start !== undefined ? start : 0; //error handling for optional
        var endAt = end !== undefined ? end : 10;
        var datatype = dtyp !== undefined ? dtyp : "Tasks";
        var tag = t !== undefined ? t : "-";

        var ilen = data.d.issues.length;
        var lptil = startAt + endAt > ilen ? ilen : startAt + endAt
        lptil = tag !== '-' ? ilen : lptil;
        // ** end setup
        if (data.d.issues !== undefined && datatype === "Tasks") {
            for (var a = startAt; a < lptil; a++) {
                var card = $(data.card).clone(true);
                post = data.d.issues[a];
                var pointer = c / 5;
                var appento = ".sec_0"; // + Math.floor(pointer).toString();
                //TODO: filter By Tag
                if (data.filter_tags(tag, post.fields.status.id) && post.fields.customfield_10021 !== null) {
                    var assignee = post.fields.assignee ? post.fields.assignee.displayName.trim() : "-";
                    var asa = assignee !== '-' ? assignee.split(" ") : "";
                    var initials = assignee !== '-' ? asa[0][0] + asa[asa.length - 1][0] : "";
                    var cont = (post.fields.assignee ?
                            "<img class='w3-circle xxxsmall w3-right w3-margin-right' src='" +
                            initials.toString().toLowerCase() + ".png'/>" : "") +
                        "<p class='w3-center'>" + post.fields.project.name + "</p>";
                    var data_for_card = [post.fields.summary ? post.fields.summary : "Not set",
                        data.color[post.fields.priority.id],
                        cont,
                        post.fields.customfield_10021 ? post.fields.customfield_10021 : "-",
                        assignee
                    ];
                    data.place_card(card, data_for_card, appento);
                } else if (post.fields.issuetype.name === "Epic" && post.fields.subtasks.length > 0) {
                    var assignee = post.fields.assignee ? post.fields.assignee.displayName.trim() : "-";
                    var asa = assignee !== '-' ? assignee.split(" ") : "";
                    var initials = assignee !== '-' ? asa[0][0] + asa[asa.length - 1][0] : "";
                    var cont = (post.fields.assignee ?
                            "<img class='w3-circle xxxsmall w3-right w3-margin-right' src='" +
                            initials.toString().toLowerCase() + ".png'/>" : "") +
                        "<p class='w3-center'>" + post.fields.project.name + "</p>";

                    var data_for_card = [post.fields.summary ? post.fields.summary : "Not set",
                        data.color[post.fields.priority.id],
                        cont,
                        post.fields.customfield_10021 ? post.fields.customfield_10021 : "-",
                        assignee
                    ];
                    data.place_card(card, data_for_card, appento);
                    $(appento).append(card);
                    console.log("Epic", card);
                    c = c + 1;
                }
            }
        } else if (datatype === "subtasks") {
            for (var a = startAt; a < lptil; a++) {
                var card = $(data.card).clone(true);
                post = data.d.issues[a];
                var pointer = c % 5;
                var assignee = post.fields.assignee ? post.fields.assignee.displayName.trim() : "-";
                $(card).find(".footer h4.w3-right").text(assignee);
                if (post.fields.subtasks.length > 0) {
                    $(card).find(".title h3 p").text(post.fields.summary ? post.fields.summary : "Not set");
                    var asa = assignee !== '-' ? assignee.split(" ") : "";
                    var initials = assignee !== '-' ? asa[0][0] + asa[asa.length - 1][0] : "";
                    var cont = "<p class='w3-center'>" + post.fields.project.name + "</p>";
                    var img = (post.fields.assignee ?
                        "<img class='w3-circle xxxsmall w3-right w3-margin-right' src='" +
                        initials.toString().toLowerCase() + ".png'/>" : "");
                    var appento = ".sec_0"; // + Math.floor(pointer).toString();
                    $(card).find(".content").html(img + cont);
                    $(appento).append(card);
                    var sub = post.fields.subtasks;
                    sub.forEach(p => {
                        if (data.filter_tags(tag, p.fields.status.id)) {
                            card = $(data.card).clone(true);
                            $(card).find(data.target.title).text(p.fields.summary ? p.fields.summary : "Not set");
                            $(card).addClass(data.color[p.fields.priority.id]);
                            //$(card).find(".content").html(cont);
                            var assignee = p.fields.assignee ? p.fields.assignee.displayName.trim() : "-";
                            $(card).find(data.target.footer_r).text(assignee);
                            $(appento).append(card);
                        }
                    });
                    c = c + 1;
                }

            }
        } else if (datatype === "nopoints") {
            for (var a = startAt; a < lptil; a++) {
                var card = $(data.card).clone(true);
                post = data.d.issues[a];
                var pointer = c / 5;
                var appento = ".sec_0"; // + Math.floor(pointer).toString();
                //TODO: filter By Tag
                if (data.filter_tags(tag, post.fields.status.id) && post.fields.customfield_10021 === null) {
                    var assignee = post.fields.assignee ? post.fields.assignee.displayName.trim() : "-";
                    var asa = assignee !== '-' ? assignee.split(" ") : "";
                    var initials = assignee !== '-' ? asa[0][0] + asa[asa.length - 1][0] : "";
                    var cont = (post.fields.assignee ?
                            "<img class='w3-circle xxxsmall w3-right w3-margin-right' src='" +
                            initials.toString().toLowerCase() + ".png'/>" : "") +
                        "<p class='w3-center'>" + post.fields.project.name + "</p>";

                    var data_for_card = [
                        post.fields.summary ? post.fields.summary : "Not set", data.color[post.fields.priority.id],
                        cont, post.fields.customfield_10021 ? post.fields.customfield_10021 : "-", assignee
                    ];
                    data.place_card(card, data_for_card, appento);
                }
            }
        }
        console.log(lptil);
        $("img").on('error',
            function() {
                $(this).hide();
            }
        );

    },
    color: ["w3-green", "w3-green", "w3-yellow", "w3-red", "w3-red", ""],
    tags: {
        todo: ["10300", "10000"],
        inpr: ["3"],
        qa: ["10002"]
    },
    filter_tags: function(t, f) {
        var ret = false;
        switch (t) {
            case "-":
                return true;
            case "todo":
                data.tags.todo.forEach(t => {
                    if (t === f)
                        ret = true;
                });
                return ret;
            case "inpr":
                data.tags.inpr.forEach(t => {
                    if (t === f)
                        ret = true;
                });
                return ret;
            case "qa":
                data.tags.qa.forEach(t => {
                    if (t === f)
                        ret = true;
                });
                return ret;
        }
    },
    place_card: function(card, dt, appendto) {
        $(card).find(data.target.title).text(dt[0]);
        $(card).addClass(dt[1]);
        $(card).find(data.target.content).html(dt[2]);
        $(card).find(data.target.footer_l).text(dt[3]);
        $(card).find(data.target.footer_r).text(dt[4]);
        $(appendto).append(card);
    }
}