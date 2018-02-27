var data = {
    target: {
        title: ".title h3 p",
        content: [".content img", ".content p"],
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
                    var cont = [initials.toString().toLowerCase() + ".png",
                        post.fields.project.name
                    ];
                    var data_for_card = [post.fields.summary ? post.fields.summary.toString() : "Not set",
                        data.color[post.fields.priority.id], cont,
                        post.fields.customfield_10021 ? post.fields.customfield_10021 : "-", initials
                    ];
                    data.place_card(card, data_for_card, appento);
                }
            }
        } else if (datatype === "subtasks") {
            for (var a = startAt; a < lptil; a++) {
                var card = $(data.card).clone(true);
                post = data.d.issues[a];
                var pointer = c % 5;
                var appento = ".sec_0";
                var assignee = post.fields.assignee ? post.fields.assignee.displayName.trim() : "-";
                $(card).find(".footer h4.w3-right").text(assignee);
                if (post.fields.subtasks.length > 0) {
                    var asa = assignee !== '-' ? assignee.split(" ") : "";
                    var initials = assignee !== '-' ? asa[0][0] + asa[asa.length - 1][0] : "";
                    var cont = [initials.toString().toLowerCase(), post.fields.project.name];
                    var appento = ".sec_0"; // + Math.floor(pointer).toString();
                    var cont = [initials.toString().toLowerCase() + ".png", post.fields.project.name];
                    var data_for_card = [post.fields.summary ? post.fields.summary : "Not set",
                        "", cont,
                        post.fields.customfield_10021 ? post.fields.customfield_10021 : "-", initials
                    ];
                    data.place_card(card, data_for_card, appento);
                    var sub = post.fields.subtasks;
                    sub.forEach(p => {
                        if (data.filter_tags(tag, p.fields.status.id)) {
                            card = $(data.card).clone(true);
                            var cont = [initials.toString().toLowerCase() + ".png", post.fields.project.name];
                            var data_for_card = [p.fields.summary ? p.fields.summary : "Not set",
                                data.color[p.fields.priority.id], cont,
                                p.fields.customfield_10021 ? p.fields.customfield_10021 : "-", initials
                            ];
                            data.place_card(card, data_for_card, appento);
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
                    var cont = [initials.toString().toLowerCase() + ".png",
                        post.fields.project.name
                    ];
                    var data_for_card = [post.fields.summary ? post.fields.summary.toString() : "Not set",
                        data.color[post.fields.priority.id], cont,
                        post.fields.customfield_10021 ? post.fields.customfield_10021 : "-", initials
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
        $(card).find(data.target.title).html(dt[0].substr(0, 120).bold());
        $(card).addClass(dt[1]);
        $(card).find(data.target.content[0]).attr('src', dt[2][0]);
        $(card).find(data.target.content[1]).text(dt[2][1]);
        $(card).find(data.target.footer_l).text(dt[3]);
        $(card).find(data.target.footer_r).text(dt[4]);
        $(appendto).append(card);
    }
}