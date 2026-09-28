// GENERATED at build time by scripts/generate-diagrams.ts — do not edit.
/* eslint-disable */
export const source = "import mongoose from \"mongoose\";\n\nconst User = mongoose.model(\"User\", new mongoose.Schema({\n  email:   { type: String, required: true, unique: true },\n  name:    { type: String, required: true },\n  roles:   [String],\n  profile: { bio: String, avatarUrl: String },\n}));\n\nconst Post = mongoose.model(\"Post\", new mongoose.Schema({\n  title:     { type: String, required: true },\n  slug:      { type: String, required: true, unique: true },\n  published: { type: Boolean, required: true },\n  author:    { type: mongoose.Schema.Types.ObjectId, ref: \"User\", required: true },\n  tags:      [{ type: mongoose.Schema.Types.ObjectId, ref: \"Tag\" }],\n}));\n\n// …plus Tag and Comment\n\nawait mongooseToErdMain([\"User\", \"Post\", \"Tag\", \"Comment\"], mongoose.model);";
export const fullD2 = "User: {\nshape: sql_table\nemail: String {constraint: unique}\nname: String\nroles: Array\nprofile: Embedded\n_id: ObjectId {constraint: primary_key}\n__v: Number\ndisplayName(): instanceMethod\nfindByEmail(): staticMethod\n}\n\n\nUser_roles: {\nshape: sql_table\nitem: String\n}\n\n\nUser_profile: {\nshape: sql_table\nbio: String\navatarUrl: String\n}\nPost: {\nshape: sql_table\ntitle: String\nslug: String {constraint: unique}\nbody: String\npublished: Boolean\nauthor: ObjectId {constraint: foreign_key}\ntags: Array\nrevisions: Array\n_id: ObjectId {constraint: primary_key}\n__v: Number\n}\n\n\nPost_tags: {\nshape: sql_table\nitem: ObjectId {constraint: foreign_key}\n}\n\n\nPost_revisions: {\nshape: sql_table\neditedAt: Date\neditedBy: ObjectId {constraint: foreign_key}\n_id: ObjectId {constraint: primary_key}\n}\nTag: {\nshape: sql_table\n_label: String {constraint: unique}\ncolour: String\n_id: ObjectId {constraint: primary_key}\n__v: Number\n}\nComment: {\nshape: sql_table\npost: ObjectId {constraint: foreign_key}\nauthor: ObjectId {constraint: foreign_key}\nbody: String\ncreatedAt: Date\n_id: ObjectId {constraint: primary_key}\n__v: Number\n}\nUser.roles -> User_roles\nUser.profile -> User_profile\nPost.author -> User\nPost.tags -> Post_tags\nPost_tags.item -> Tag\nPost.revisions -> Post_revisions\nPost_revisions.editedBy -> User\nComment.post -> Post\nComment.author -> User\n";
export const minimalD2 = "\n\nUser: {\n  shape: sql_table\n}\n\n\n\nPost: {\n  shape: sql_table\n}\n\nPost -> User\n\n\nTag: {\n  shape: sql_table\n}\n\n\n\nComment: {\n  shape: sql_table\n}\n\nComment -> Post\nComment -> User\n";
export const fullSvg = "<?xml version=\"1.0\" encoding=\"utf-8\"?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" data-d2-version=\"v0.7.0-HEAD\" preserveAspectRatio=\"xMinYMin meet\" viewBox=\"0 0 905 1790\"><svg class=\"d2-2923228527 d2-svg\" width=\"905\" height=\"1790\" viewBox=\"-101 -101 905 1790\"><rect x=\"-101.000000\" y=\"-101.000000\" width=\"905.000000\" height=\"1790.000000\" rx=\"0.000000\" fill=\"#FFFFFF\" class=\" fill-N7\" stroke-width=\"0\" /><style type=\"text/css\"><![CDATA[\n.d2-2923228527 .text {\n\tfont-family: \"d2-2923228527-font-regular\";\n}\n@font-face {\n\tfont-family: d2-2923228527-font-regular;\n\tsrc: url(\"data:application/font-woff;base64,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\");\n}]]></style><style type=\"text/css\"><![CDATA[.shape {\n  shape-rendering: geometricPrecision;\n  stroke-linejoin: round;\n}\n.connection {\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.blend {\n  mix-blend-mode: multiply;\n  opacity: 0.5;\n}\n\n\t\t.d2-2923228527 .fill-N1{fill:#0A0F25;}\n\t\t.d2-2923228527 .fill-N2{fill:#676C7E;}\n\t\t.d2-2923228527 .fill-N3{fill:#9499AB;}\n\t\t.d2-2923228527 .fill-N4{fill:#CFD2DD;}\n\t\t.d2-2923228527 .fill-N5{fill:#DEE1EB;}\n\t\t.d2-2923228527 .fill-N6{fill:#EEF1F8;}\n\t\t.d2-2923228527 .fill-N7{fill:#FFFFFF;}\n\t\t.d2-2923228527 .fill-B1{fill:#0D32B2;}\n\t\t.d2-2923228527 .fill-B2{fill:#0D32B2;}\n\t\t.d2-2923228527 .fill-B3{fill:#E3E9FD;}\n\t\t.d2-2923228527 .fill-B4{fill:#E3E9FD;}\n\t\t.d2-2923228527 .fill-B5{fill:#EDF0FD;}\n\t\t.d2-2923228527 .fill-B6{fill:#F7F8FE;}\n\t\t.d2-2923228527 .fill-AA2{fill:#4A6FF3;}\n\t\t.d2-2923228527 .fill-AA4{fill:#EDF0FD;}\n\t\t.d2-2923228527 .fill-AA5{fill:#F7F8FE;}\n\t\t.d2-2923228527 .fill-AB4{fill:#EDF0FD;}\n\t\t.d2-2923228527 .fill-AB5{fill:#F7F8FE;}\n\t\t.d2-2923228527 .stroke-N1{stroke:#0A0F25;}\n\t\t.d2-2923228527 .stroke-N2{stroke:#676C7E;}\n\t\t.d2-2923228527 .stroke-N3{stroke:#9499AB;}\n\t\t.d2-2923228527 .stroke-N4{stroke:#CFD2DD;}\n\t\t.d2-2923228527 .stroke-N5{stroke:#DEE1EB;}\n\t\t.d2-2923228527 .stroke-N6{stroke:#EEF1F8;}\n\t\t.d2-2923228527 .stroke-N7{stroke:#FFFFFF;}\n\t\t.d2-2923228527 .stroke-B1{stroke:#0D32B2;}\n\t\t.d2-2923228527 .stroke-B2{stroke:#0D32B2;}\n\t\t.d2-2923228527 .stroke-B3{stroke:#E3E9FD;}\n\t\t.d2-2923228527 .stroke-B4{stroke:#E3E9FD;}\n\t\t.d2-2923228527 .stroke-B5{stroke:#EDF0FD;}\n\t\t.d2-2923228527 .stroke-B6{stroke:#F7F8FE;}\n\t\t.d2-2923228527 .stroke-AA2{stroke:#4A6FF3;}\n\t\t.d2-2923228527 .stroke-AA4{stroke:#EDF0FD;}\n\t\t.d2-2923228527 .stroke-AA5{stroke:#F7F8FE;}\n\t\t.d2-2923228527 .stroke-AB4{stroke:#EDF0FD;}\n\t\t.d2-2923228527 .stroke-AB5{stroke:#F7F8FE;}\n\t\t.d2-2923228527 .background-color-N1{background-color:#0A0F25;}\n\t\t.d2-2923228527 .background-color-N2{background-color:#676C7E;}\n\t\t.d2-2923228527 .background-color-N3{background-color:#9499AB;}\n\t\t.d2-2923228527 .background-color-N4{background-color:#CFD2DD;}\n\t\t.d2-2923228527 .background-color-N5{background-color:#DEE1EB;}\n\t\t.d2-2923228527 .background-color-N6{background-color:#EEF1F8;}\n\t\t.d2-2923228527 .background-color-N7{background-color:#FFFFFF;}\n\t\t.d2-2923228527 .background-color-B1{background-color:#0D32B2;}\n\t\t.d2-2923228527 .background-color-B2{background-color:#0D32B2;}\n\t\t.d2-2923228527 .background-color-B3{background-color:#E3E9FD;}\n\t\t.d2-2923228527 .background-color-B4{background-color:#E3E9FD;}\n\t\t.d2-2923228527 .background-color-B5{background-color:#EDF0FD;}\n\t\t.d2-2923228527 .background-color-B6{background-color:#F7F8FE;}\n\t\t.d2-2923228527 .background-color-AA2{background-color:#4A6FF3;}\n\t\t.d2-2923228527 .background-color-AA4{background-color:#EDF0FD;}\n\t\t.d2-2923228527 .background-color-AA5{background-color:#F7F8FE;}\n\t\t.d2-2923228527 .background-color-AB4{background-color:#EDF0FD;}\n\t\t.d2-2923228527 .background-color-AB5{background-color:#F7F8FE;}\n\t\t.d2-2923228527 .color-N1{color:#0A0F25;}\n\t\t.d2-2923228527 .color-N2{color:#676C7E;}\n\t\t.d2-2923228527 .color-N3{color:#9499AB;}\n\t\t.d2-2923228527 .color-N4{color:#CFD2DD;}\n\t\t.d2-2923228527 .color-N5{color:#DEE1EB;}\n\t\t.d2-2923228527 .color-N6{color:#EEF1F8;}\n\t\t.d2-2923228527 .color-N7{color:#FFFFFF;}\n\t\t.d2-2923228527 .color-B1{color:#0D32B2;}\n\t\t.d2-2923228527 .color-B2{color:#0D32B2;}\n\t\t.d2-2923228527 .color-B3{color:#E3E9FD;}\n\t\t.d2-2923228527 .color-B4{color:#E3E9FD;}\n\t\t.d2-2923228527 .color-B5{color:#EDF0FD;}\n\t\t.d2-2923228527 .color-B6{color:#F7F8FE;}\n\t\t.d2-2923228527 .color-AA2{color:#4A6FF3;}\n\t\t.d2-2923228527 .color-AA4{color:#EDF0FD;}\n\t\t.d2-2923228527 .color-AA5{color:#F7F8FE;}\n\t\t.d2-2923228527 .color-AB4{color:#EDF0FD;}\n\t\t.d2-2923228527 .color-AB5{color:#F7F8FE;}.appendix text.text{fill:#0A0F25}.md{--color-fg-default:#0A0F25;--color-fg-muted:#676C7E;--color-fg-subtle:#9499AB;--color-canvas-default:#FFFFFF;--color-canvas-subtle:#EEF1F8;--color-border-default:#0D32B2;--color-border-muted:#0D32B2;--color-neutral-muted:#EEF1F8;--color-accent-fg:#0D32B2;--color-accent-emphasis:#0D32B2;--color-attention-subtle:#676C7E;--color-danger-fg:red;}.sketch-overlay-B1{fill:url(#streaks-darker-d2-2923228527);mix-blend-mode:lighten}.sketch-overlay-B2{fill:url(#streaks-darker-d2-2923228527);mix-blend-mode:lighten}.sketch-overlay-B3{fill:url(#streaks-bright-d2-2923228527);mix-blend-mode:darken}.sketch-overlay-B4{fill:url(#streaks-bright-d2-2923228527);mix-blend-mode:darken}.sketch-overlay-B5{fill:url(#streaks-bright-d2-2923228527);mix-blend-mode:darken}.sketch-overlay-B6{fill:url(#streaks-bright-d2-2923228527);mix-blend-mode:darken}.sketch-overlay-AA2{fill:url(#streaks-dark-d2-2923228527);mix-blend-mode:overlay}.sketch-overlay-AA4{fill:url(#streaks-bright-d2-2923228527);mix-blend-mode:darken}.sketch-overlay-AA5{fill:url(#streaks-bright-d2-2923228527);mix-blend-mode:darken}.sketch-overlay-AB4{fill:url(#streaks-bright-d2-2923228527);mix-blend-mode:darken}.sketch-overlay-AB5{fill:url(#streaks-bright-d2-2923228527);mix-blend-mode:darken}.sketch-overlay-N1{fill:url(#streaks-darker-d2-2923228527);mix-blend-mode:lighten}.sketch-overlay-N2{fill:url(#streaks-dark-d2-2923228527);mix-blend-mode:overlay}.sketch-overlay-N3{fill:url(#streaks-normal-d2-2923228527);mix-blend-mode:color-burn}.sketch-overlay-N4{fill:url(#streaks-normal-d2-2923228527);mix-blend-mode:color-burn}.sketch-overlay-N5{fill:url(#streaks-bright-d2-2923228527);mix-blend-mode:darken}.sketch-overlay-N6{fill:url(#streaks-bright-d2-2923228527);mix-blend-mode:darken}.sketch-overlay-N7{fill:url(#streaks-bright-d2-2923228527);mix-blend-mode:darken}.light-code{display: block}.dark-code{display: none}]]></style><g class=\"VXNlcg==\"><g class=\"shape\" ><rect x=\"47.000000\" y=\"1056.000000\" width=\"364.000000\" height=\"324.000000\" stroke=\"#0A0F25\" fill=\"#FFFFFF\" class=\"shape stroke-N1 fill-N7\" style=\"stroke-width:2;\" /><rect x=\"47.000000\" y=\"1056.000000\" width=\"364.000000\" height=\"36.000000\" fill=\"#0A0F25\" class=\"class_header fill-N1\" /><text x=\"57.000000\" y=\"1081.750000\" fill=\"#FFFFFF\" class=\"text fill-N7\" style=\"text-anchor:start;font-size:24px\">User</text><text x=\"57.000000\" y=\"1115.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">email</text><text x=\"198.000000\" y=\"1115.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">String</text><text x=\"401.000000\" y=\"1115.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\">UNQ</text><line x1=\"47.000000\" x2=\"411.000000\" y1=\"1128.000000\" y2=\"1128.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"57.000000\" y=\"1151.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">name</text><text x=\"198.000000\" y=\"1151.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">String</text><text x=\"401.000000\" y=\"1151.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"47.000000\" x2=\"411.000000\" y1=\"1164.000000\" y2=\"1164.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"57.000000\" y=\"1187.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">roles</text><text x=\"198.000000\" y=\"1187.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">Array</text><text x=\"401.000000\" y=\"1187.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"47.000000\" x2=\"411.000000\" y1=\"1200.000000\" y2=\"1200.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"57.000000\" y=\"1223.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">profile</text><text x=\"198.000000\" y=\"1223.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">Embedded</text><text x=\"401.000000\" y=\"1223.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"47.000000\" x2=\"411.000000\" y1=\"1236.000000\" y2=\"1236.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"57.000000\" y=\"1259.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">_id</text><text x=\"198.000000\" y=\"1259.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">ObjectId</text><text x=\"401.000000\" y=\"1259.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\">PK</text><line x1=\"47.000000\" x2=\"411.000000\" y1=\"1272.000000\" y2=\"1272.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"57.000000\" y=\"1295.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">__v</text><text x=\"198.000000\" y=\"1295.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">Number</text><text x=\"401.000000\" y=\"1295.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"47.000000\" x2=\"411.000000\" y1=\"1308.000000\" y2=\"1308.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"57.000000\" y=\"1331.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">displayName()</text><text x=\"198.000000\" y=\"1331.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">instanceMethod</text><text x=\"401.000000\" y=\"1331.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"47.000000\" x2=\"411.000000\" y1=\"1344.000000\" y2=\"1344.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"57.000000\" y=\"1367.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">findByEmail()</text><text x=\"198.000000\" y=\"1367.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">staticMethod</text><text x=\"401.000000\" y=\"1367.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"47.000000\" x2=\"411.000000\" y1=\"1380.000000\" y2=\"1380.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /></g></g><g class=\"VXNlcl9yb2xlcw==\"><g class=\"shape\" ><rect x=\"0.000000\" y=\"1498.000000\" width=\"139.000000\" height=\"72.000000\" stroke=\"#0A0F25\" fill=\"#FFFFFF\" class=\"shape stroke-N1 fill-N7\" style=\"stroke-width:2;\" /><rect x=\"0.000000\" y=\"1498.000000\" width=\"139.000000\" height=\"36.000000\" fill=\"#0A0F25\" class=\"class_header fill-N1\" /><text x=\"10.000000\" y=\"1523.750000\" fill=\"#FFFFFF\" class=\"text fill-N7\" style=\"text-anchor:start;font-size:24px\">User_roles</text><text x=\"10.000000\" y=\"1557.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">item</text><text x=\"68.000000\" y=\"1557.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">String</text><text x=\"129.000000\" y=\"1557.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"0.000000\" x2=\"139.000000\" y1=\"1570.000000\" y2=\"1570.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /></g></g><g class=\"VXNlcl9wcm9maWxl\"><g class=\"shape\" ><rect x=\"199.000000\" y=\"1480.000000\" width=\"179.000000\" height=\"108.000000\" stroke=\"#0A0F25\" fill=\"#FFFFFF\" class=\"shape stroke-N1 fill-N7\" style=\"stroke-width:2;\" /><rect x=\"199.000000\" y=\"1480.000000\" width=\"179.000000\" height=\"36.000000\" fill=\"#0A0F25\" class=\"class_header fill-N1\" /><text x=\"209.000000\" y=\"1505.750000\" fill=\"#FFFFFF\" class=\"text fill-N7\" style=\"text-anchor:start;font-size:24px\">User_profile</text><text x=\"209.000000\" y=\"1539.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">bio</text><text x=\"307.000000\" y=\"1539.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">String</text><text x=\"368.000000\" y=\"1539.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"199.000000\" x2=\"378.000000\" y1=\"1552.000000\" y2=\"1552.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"209.000000\" y=\"1575.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">avatarUrl</text><text x=\"307.000000\" y=\"1575.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">String</text><text x=\"368.000000\" y=\"1575.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"199.000000\" x2=\"378.000000\" y1=\"1588.000000\" y2=\"1588.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /></g></g><g class=\"UG9zdA==\"><g class=\"shape\" ><rect x=\"243.000000\" y=\"352.000000\" width=\"260.000000\" height=\"360.000000\" stroke=\"#0A0F25\" fill=\"#FFFFFF\" class=\"shape stroke-N1 fill-N7\" style=\"stroke-width:2;\" /><rect x=\"243.000000\" y=\"352.000000\" width=\"260.000000\" height=\"36.000000\" fill=\"#0A0F25\" class=\"class_header fill-N1\" /><text x=\"253.000000\" y=\"377.750000\" fill=\"#FFFFFF\" class=\"text fill-N7\" style=\"text-anchor:start;font-size:24px\">Post</text><text x=\"253.000000\" y=\"411.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">title</text><text x=\"355.000000\" y=\"411.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">String</text><text x=\"493.000000\" y=\"411.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"243.000000\" x2=\"503.000000\" y1=\"424.000000\" y2=\"424.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"253.000000\" y=\"447.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">slug</text><text x=\"355.000000\" y=\"447.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">String</text><text x=\"493.000000\" y=\"447.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\">UNQ</text><line x1=\"243.000000\" x2=\"503.000000\" y1=\"460.000000\" y2=\"460.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"253.000000\" y=\"483.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">body</text><text x=\"355.000000\" y=\"483.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">String</text><text x=\"493.000000\" y=\"483.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"243.000000\" x2=\"503.000000\" y1=\"496.000000\" y2=\"496.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"253.000000\" y=\"519.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">published</text><text x=\"355.000000\" y=\"519.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">Boolean</text><text x=\"493.000000\" y=\"519.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"243.000000\" x2=\"503.000000\" y1=\"532.000000\" y2=\"532.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"253.000000\" y=\"555.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">author</text><text x=\"355.000000\" y=\"555.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">ObjectId</text><text x=\"493.000000\" y=\"555.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\">FK</text><line x1=\"243.000000\" x2=\"503.000000\" y1=\"568.000000\" y2=\"568.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"253.000000\" y=\"591.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">tags</text><text x=\"355.000000\" y=\"591.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">Array</text><text x=\"493.000000\" y=\"591.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"243.000000\" x2=\"503.000000\" y1=\"604.000000\" y2=\"604.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"253.000000\" y=\"627.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">revisions</text><text x=\"355.000000\" y=\"627.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">Array</text><text x=\"493.000000\" y=\"627.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"243.000000\" x2=\"503.000000\" y1=\"640.000000\" y2=\"640.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"253.000000\" y=\"663.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">_id</text><text x=\"355.000000\" y=\"663.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">ObjectId</text><text x=\"493.000000\" y=\"663.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\">PK</text><line x1=\"243.000000\" x2=\"503.000000\" y1=\"676.000000\" y2=\"676.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"253.000000\" y=\"699.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">__v</text><text x=\"355.000000\" y=\"699.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">Number</text><text x=\"493.000000\" y=\"699.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"243.000000\" x2=\"503.000000\" y1=\"712.000000\" y2=\"712.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /></g></g><g class=\"UG9zdF90YWdz\"><g class=\"shape\" ><rect x=\"488.000000\" y=\"848.000000\" width=\"199.000000\" height=\"72.000000\" stroke=\"#0A0F25\" fill=\"#FFFFFF\" class=\"shape stroke-N1 fill-N7\" style=\"stroke-width:2;\" /><rect x=\"488.000000\" y=\"848.000000\" width=\"199.000000\" height=\"36.000000\" fill=\"#0A0F25\" class=\"class_header fill-N1\" /><text x=\"498.000000\" y=\"873.750000\" fill=\"#FFFFFF\" class=\"text fill-N7\" style=\"text-anchor:start;font-size:24px\">Post_tags</text><text x=\"498.000000\" y=\"907.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">item</text><text x=\"556.000000\" y=\"907.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">ObjectId</text><text x=\"677.000000\" y=\"907.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\">FK</text><line x1=\"488.000000\" x2=\"687.000000\" y1=\"920.000000\" y2=\"920.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /></g></g><g class=\"UG9zdF9yZXZpc2lvbnM=\"><g class=\"shape\" ><rect x=\"139.000000\" y=\"812.000000\" width=\"239.000000\" height=\"144.000000\" stroke=\"#0A0F25\" fill=\"#FFFFFF\" class=\"shape stroke-N1 fill-N7\" style=\"stroke-width:2;\" /><rect x=\"139.000000\" y=\"812.000000\" width=\"239.000000\" height=\"36.000000\" fill=\"#0A0F25\" class=\"class_header fill-N1\" /><text x=\"149.000000\" y=\"837.750000\" fill=\"#FFFFFF\" class=\"text fill-N7\" style=\"text-anchor:start;font-size:24px\">Post_revisions</text><text x=\"149.000000\" y=\"871.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">editedAt</text><text x=\"245.000000\" y=\"871.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">Date</text><text x=\"368.000000\" y=\"871.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"139.000000\" x2=\"378.000000\" y1=\"884.000000\" y2=\"884.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"149.000000\" y=\"907.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">editedBy</text><text x=\"245.000000\" y=\"907.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">ObjectId</text><text x=\"368.000000\" y=\"907.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\">FK</text><line x1=\"139.000000\" x2=\"378.000000\" y1=\"920.000000\" y2=\"920.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"149.000000\" y=\"943.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">_id</text><text x=\"245.000000\" y=\"943.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">ObjectId</text><text x=\"368.000000\" y=\"943.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\">PK</text><line x1=\"139.000000\" x2=\"378.000000\" y1=\"956.000000\" y2=\"956.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /></g></g><g class=\"VGFn\"><g class=\"shape\" ><rect x=\"471.000000\" y=\"1128.000000\" width=\"232.000000\" height=\"180.000000\" stroke=\"#0A0F25\" fill=\"#FFFFFF\" class=\"shape stroke-N1 fill-N7\" style=\"stroke-width:2;\" /><rect x=\"471.000000\" y=\"1128.000000\" width=\"232.000000\" height=\"36.000000\" fill=\"#0A0F25\" class=\"class_header fill-N1\" /><text x=\"481.000000\" y=\"1153.750000\" fill=\"#FFFFFF\" class=\"text fill-N7\" style=\"text-anchor:start;font-size:24px\">Tag</text><text x=\"481.000000\" y=\"1187.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">_label</text><text x=\"555.000000\" y=\"1187.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">String</text><text x=\"693.000000\" y=\"1187.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\">UNQ</text><line x1=\"471.000000\" x2=\"703.000000\" y1=\"1200.000000\" y2=\"1200.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"481.000000\" y=\"1223.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">colour</text><text x=\"555.000000\" y=\"1223.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">String</text><text x=\"693.000000\" y=\"1223.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"471.000000\" x2=\"703.000000\" y1=\"1236.000000\" y2=\"1236.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"481.000000\" y=\"1259.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">_id</text><text x=\"555.000000\" y=\"1259.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">ObjectId</text><text x=\"693.000000\" y=\"1259.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\">PK</text><line x1=\"471.000000\" x2=\"703.000000\" y1=\"1272.000000\" y2=\"1272.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"481.000000\" y=\"1295.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">__v</text><text x=\"555.000000\" y=\"1295.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">Number</text><text x=\"693.000000\" y=\"1295.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"471.000000\" x2=\"703.000000\" y1=\"1308.000000\" y2=\"1308.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /></g></g><g class=\"Q29tbWVudA==\"><g class=\"shape\" ><rect x=\"57.000000\" y=\"0.000000\" width=\"245.000000\" height=\"252.000000\" stroke=\"#0A0F25\" fill=\"#FFFFFF\" class=\"shape stroke-N1 fill-N7\" style=\"stroke-width:2;\" /><rect x=\"57.000000\" y=\"0.000000\" width=\"245.000000\" height=\"36.000000\" fill=\"#0A0F25\" class=\"class_header fill-N1\" /><text x=\"67.000000\" y=\"25.750000\" fill=\"#FFFFFF\" class=\"text fill-N7\" style=\"text-anchor:start;font-size:24px\">Comment</text><text x=\"67.000000\" y=\"59.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">post</text><text x=\"169.000000\" y=\"59.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">ObjectId</text><text x=\"292.000000\" y=\"59.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\">FK</text><line x1=\"57.000000\" x2=\"302.000000\" y1=\"72.000000\" y2=\"72.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"67.000000\" y=\"95.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">author</text><text x=\"169.000000\" y=\"95.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">ObjectId</text><text x=\"292.000000\" y=\"95.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\">FK</text><line x1=\"57.000000\" x2=\"302.000000\" y1=\"108.000000\" y2=\"108.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"67.000000\" y=\"131.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">body</text><text x=\"169.000000\" y=\"131.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">String</text><text x=\"292.000000\" y=\"131.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"57.000000\" x2=\"302.000000\" y1=\"144.000000\" y2=\"144.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"67.000000\" y=\"167.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">createdAt</text><text x=\"169.000000\" y=\"167.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">Date</text><text x=\"292.000000\" y=\"167.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"57.000000\" x2=\"302.000000\" y1=\"180.000000\" y2=\"180.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"67.000000\" y=\"203.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">_id</text><text x=\"169.000000\" y=\"203.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">ObjectId</text><text x=\"292.000000\" y=\"203.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\">PK</text><line x1=\"57.000000\" x2=\"302.000000\" y1=\"216.000000\" y2=\"216.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /><text x=\"67.000000\" y=\"239.000000\" fill=\"#0D32B2\" class=\"text fill-B2\" style=\"text-anchor:start;font-size:20px\">__v</text><text x=\"169.000000\" y=\"239.000000\" fill=\"#676C7E\" class=\"text fill-N2\" style=\"text-anchor:start;font-size:20px\">Number</text><text x=\"292.000000\" y=\"239.000000\" fill=\"#4A6FF3\" class=\"text fill-AA2\" style=\"text-anchor:end;font-size:20px\" /><line x1=\"57.000000\" x2=\"302.000000\" y1=\"252.000000\" y2=\"252.000000\" stroke=\"#0A0F25\" class=\" stroke-N1\" style=\"stroke-width:2\" /></g></g><g class=\"KFVzZXIgLSZndDsgVXNlcl9yb2xlcylbMF0=\"><marker id=\"mk-d2-2923228527-3488378134\" markerWidth=\"10.000000\" markerHeight=\"12.000000\" refX=\"7.000000\" refY=\"6.000000\" viewBox=\"0.000000 0.000000 10.000000 12.000000\" orient=\"auto\" markerUnits=\"userSpaceOnUse\"> <polygon points=\"0.000000,0.000000 10.000000,6.000000 0.000000,12.000000\" fill=\"#0D32B2\" class=\"connection fill-B1\" stroke-width=\"2\" /> </marker><path d=\"M 106.289833 1381.592324 C 77.099998 1420.000000 69.500000 1443.599976 69.500000 1494.000000\" stroke=\"#0D32B2\" fill=\"none\" class=\"connection stroke-B1\" style=\"stroke-width:2;\" marker-end=\"url(#mk-d2-2923228527-3488378134)\" mask=\"url(#d2-2923228527)\" /></g><g class=\"KFVzZXIgLSZndDsgVXNlcl9wcm9maWxlKVswXQ==\"><path d=\"M 275.039260 1381.925928 C 285.700012 1420.000000 288.500000 1440.000000 288.500000 1476.000000\" stroke=\"#0D32B2\" fill=\"none\" class=\"connection stroke-B1\" style=\"stroke-width:2;\" marker-end=\"url(#mk-d2-2923228527-3488378134)\" mask=\"url(#d2-2923228527)\" /></g><g class=\"KFBvc3QgLSZndDsgVXNlcilbMF0=\"><path d=\"M 408.642232 713.961161 C 416.250000 752.000000 418.250000 786.400024 418.250000 823.000000 C 418.250000 859.599976 409.250000 1016.000000 375.925859 1053.026823\" stroke=\"#0D32B2\" fill=\"none\" class=\"connection stroke-B1\" style=\"stroke-width:2;\" marker-end=\"url(#mk-d2-2923228527-3488378134)\" mask=\"url(#d2-2923228527)\" /></g><g class=\"KFBvc3QgLSZndDsgUG9zdF90YWdzKVswXQ==\"><path d=\"M 504.612370 673.183217 C 570.450012 743.942993 587.250000 779.200012 587.250000 844.000000\" stroke=\"#0D32B2\" fill=\"none\" class=\"connection stroke-B1\" style=\"stroke-width:2;\" marker-end=\"url(#mk-d2-2923228527-3488378134)\" mask=\"url(#d2-2923228527)\" /></g><g class=\"KFBvc3RfdGFncyAtJmd0OyBUYWcpWzBd\"><path d=\"M 587.250000 922.000000 C 587.250000 988.799988 587.250000 1030.400024 587.250000 1124.000000\" stroke=\"#0D32B2\" fill=\"none\" class=\"connection stroke-B1\" style=\"stroke-width:2;\" marker-end=\"url(#mk-d2-2923228527-3488378134)\" mask=\"url(#d2-2923228527)\" /></g><g class=\"KFBvc3QgLSZndDsgUG9zdF9yZXZpc2lvbnMpWzBd\"><path d=\"M 282.855573 713.788854 C 263.750000 752.000000 258.750000 772.000000 258.750000 808.000000\" stroke=\"#0D32B2\" fill=\"none\" class=\"connection stroke-B1\" style=\"stroke-width:2;\" marker-end=\"url(#mk-d2-2923228527-3488378134)\" mask=\"url(#d2-2923228527)\" /></g><g class=\"KFBvc3RfcmV2aXNpb25zIC0mZ3Q7IFVzZXIpWzBd\"><path d=\"M 258.750000 958.000000 C 258.750000 996.000000 257.350006 1016.000000 252.304592 1052.038633\" stroke=\"#0D32B2\" fill=\"none\" class=\"connection stroke-B1\" style=\"stroke-width:2;\" marker-end=\"url(#mk-d2-2923228527-3488378134)\" mask=\"url(#d2-2923228527)\" /></g><g class=\"KENvbW1lbnQgLSZndDsgUG9zdClbMF0=\"><path d=\"M 303.972692 238.343216 C 359.100006 288.997986 373.250000 312.000000 373.250000 348.000000\" stroke=\"#0D32B2\" fill=\"none\" class=\"connection stroke-B1\" style=\"stroke-width:2;\" marker-end=\"url(#mk-d2-2923228527-3488378134)\" mask=\"url(#d2-2923228527)\" /></g><g class=\"KENvbW1lbnQgLSZndDsgVXNlcilbMF0=\"><path d=\"M 121.414189 253.816981 C 103.849998 292.000000 99.250000 348.000000 99.250000 417.000000 C 99.250000 486.000000 99.250000 578.000000 99.250000 647.000000 C 99.250000 716.000000 99.250000 786.400024 99.250000 823.000000 C 99.250000 859.599976 105.449997 1016.000000 128.142241 1052.600389\" stroke=\"#0D32B2\" fill=\"none\" class=\"connection stroke-B1\" style=\"stroke-width:2;\" marker-end=\"url(#mk-d2-2923228527-3488378134)\" mask=\"url(#d2-2923228527)\" /></g><mask id=\"d2-2923228527\" maskUnits=\"userSpaceOnUse\" x=\"-101\" y=\"-101\" width=\"905\" height=\"1790\">\n<rect x=\"-101\" y=\"-101\" width=\"905\" height=\"1790\" fill=\"white\"></rect>\n\n</mask></svg></svg>";
export const minimalSvg = "<?xml version=\"1.0\" encoding=\"utf-8\"?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" data-d2-version=\"v0.7.0-HEAD\" preserveAspectRatio=\"xMinYMin meet\" viewBox=\"0 0 454 510\"><svg class=\"d2-3508604964 d2-svg\" width=\"454\" height=\"510\" viewBox=\"-101 -101 454 510\"><rect x=\"-101.000000\" y=\"-101.000000\" width=\"454.000000\" height=\"510.000000\" rx=\"0.000000\" fill=\"#FFFFFF\" class=\" fill-N7\" stroke-width=\"0\" /><style type=\"text/css\"><![CDATA[\n.d2-3508604964 .text {\n\tfont-family: \"d2-3508604964-font-regular\";\n}\n@font-face {\n\tfont-family: d2-3508604964-font-regular;\n\tsrc: url(\"data:application/font-woff;base64,d09GRgABAAAAAAn0AAoAAAAAD7gAAguFAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAAA9AAAAGAAAABgXd/Vo2NtYXAAAAFUAAAAbAAAAIACEAIjZ2x5ZgAAAcAAAAQaAAAFJPXdJrhoZWFkAAAF3AAAADYAAAA2G4Ue32hoZWEAAAYUAAAAJAAAACQKhAXQaG10eAAABjgAAAA4AAAAOB1JA0Fsb2NhAAAGcAAAAB4AAAAeCgIItG1heHAAAAaQAAAAIAAAACAAJgD2bmFtZQAABrAAAAMjAAAIFAbDVU1wb3N0AAAJ1AAAAB0AAAAg/9EAMgADAgkBkAAFAAACigJYAAAASwKKAlgAAAFeADIBIwAAAgsFAwMEAwICBGAAAvcAAAADAAAAAAAAAABBREJPAEAAIP//Au7/BgAAA9gBESAAAZ8AAAAAAeYClAAAACAAA3icXMy9iQJRAEbR8+bNrn8jiC3ZgIEWYCBGIsg0IyYK5oIF2NonDEbe8AQXRVXQafVYWqgaK2tbO3sHJ33CYJuvHZ2TvPPKM4/cc8s1l+H0W9GoWn/+jYxNTM105nwAAAD//wEAAP//WDMYJHicVFRNbNPmG39eJ3UESf6pqR03TdrENrGb78afQB1bTUMIbb7qtkApVII/I1C6asphqFK3ChVtvUzrgQPSduC6I5dp0m6ThqZtmrTLdtkB7VAhscMWVTuBM8VJq3J6LOvV7/l9vS8MwQoApmBPwAWnIABngAKQCIaIM4LAeTRJ0zjapQmI8KygP+x9hC7LblV154uvi1s7O+jax9iTtxsXHrda3689fGh/dvDKFtEvrwCB3D3EwtiXMA4wxPK8IquqJAZpD89zLI5TZDAoiapG4ziyrEfz1ceL+o1IZqyYNG5K4qqRm4tmhdu+hacP1p9a+ZgaYWc+tKyt4iQrZ0QAwOA6AObF9sELZI+xJAaDFIlzHEFIoqrIPMdd/3Zu0/hkY+P2lcWrV9aw/bPLldYd+w2qzJQvaQCAIAKA3mD74OkhcApDccSfL9DLF9hcufz2a3DOXO0eYllsv+eLo4OQiD531fnEcTQ7+8BYTFxMpcuJprHuU7fvo0f2R41Vnl9toF175/62CljPD/QcdWAMzgLQbM8QTXbM8AiONRTBCRyOC6KqKY5B3xUWPv+CSE0m58Zj7P8vrDRLHhe7EOQMbuuW6Ls801wmoue4GHk+mHh/1f7tQiRZZKOfBvRcIg4YZLuH6EfUgVGIvpMAReIe5th8FyP3KCB6Zt0w72g330OY/c3Q1TI3HR6PNn5CbvO8tOArtBvNtrF9zx86VbtBESo5gfi5WgMAXJDpxtBfqAN5KEDtWJnCnxhO8BLFOQnhHCs48qQ+GdzVj4vt/RsZRMfy/TP/rnzAM2dC7MioIC7lybP+r+4Q9FRTFFj/mXh+bXlZ36wmC3oqpRfU8pKUW/ofMzw2Ov+yZEbPB93eyUg063eTpZRST3qGzGElKlcThDdM0hNaIVPNoeemoui6opj2XoFnx9zukSQlZJ3cLQDsH9QBxmkXLfVVHCVF9Bh7jqdV8rhi1dQ5M8DX0/OXrXRWLVnpnFpCB2Uul08n5Fs37Z9RomTM288Go78D/Y46gwYPdhyh431Yri7WLlnpqfh03AE7AuLj9jMY5Pw36kAAwu/k7HgrnPAWBaZbptma1u+a5l3drNVMo1736e2m1db1ttVs66XW4tK9e0uLrYF+tIY6QJzgNri9fWKhSmKcHvaRgehsCB1cy6qnK263aNg/9O9NpHuIdlEHkk4nBM2pnCLzvJDFFPnEW9B7CugJrEf3V3mNS8RKqakpRgqzxeRKI1OPTIbUWDY1MRXmSplEwydEtBCTiYZY+rSfURLTjRgtj4wmI/Q45fUzWlYoTjr7R7uH6CK2CXS/kwSnaJpESRRHkEflf10vVKqnL+7uMkn/hG+YzPmuV5DfGNrbm7U7mfwpt+HxAvwHAAD//wEAAP//YeAP8AAAAAEAAAACC4VR4VVJXw889QADA+gAAAAA2F2goQAAAADdZi82/jr+2whvA8gAAAADAAIAAAAAAAAAAQAAA9j+7wAACJj+Ov46CG8AAQAAAAAAAAAAAAAAAAAAAA4CjQBZAjsANAI2AFoCGAAcAoUAVwH4ADQB8AAuAfgALQM9AFICIwBSAh4ALgFbAFIBowAcAVIAGAAAACwAXAB+AJAAtADsASABjAG+AeACDAIsAmwCkgAAAAEAAAAOAIwADABmAAcAAQAAAAAAAAAAAAAAAAAEAAN4nJyU3U4bVxSFPwfbbVQ1FxWKyA06l22VjN0IogSuTAmKVYRTj9Mfqao0eMY/Yjwz8gxQqj5Ar/sWfYtc9Tn6EFWvq7O8DTaqFIEQsM6cvfdZZ6+1D7DJv2xQqz8E/mr+YLjGdnPP8AMeNZ8a3uC48bfh+kpMg7jxm+EmXzb6hj/iff0Pwx+zU//Z8EO26keGP+F5fdPwpxuOfww/Yof3C1yDl/xuuMYWheEHbPKT4Q0eYzVrdR7TNtzgM7YNN9kGBkypSJmSMcYxYsqYc+YklIQkzJkyIiHG0aVDSqWvGZGQY/y/XyNCKuZEqjihwpESkhJRMrGKvyor561OHGk1t70OFRMiTpVxRkSGI2dMTkbCmepUVBTs0aJFyVB8CypKAkqmpATkzBnToscRxwyYMKXEcaRKnllIzoiKSyKd7yzCd2ZIQkZprM7JiMXTiV+i7C7HOHoUil2tfLxW4SmO75TtueWK/YpAv26F2fq5SzYRF+pnqq6k2rmUghPt+nM7fCtcsYe7V3/WmXy4R7H+V6p8yrn0j6VUJiYZzm3RIZSDQvcEx4HWXUJ15Hu6DHhDj3cMtO7Qp0+HEwZ0ea3cHn0cX9PjhENldIUXe0dyzAk/4viGrmJ87cT6s1As4RcKc3cpjnPdY0ahnnvmge6a6IZ3V9jPUL7mjlI5Q82Rj3TSL9OcRYzNFYUYztTLpTdK619sjpjpLl7bm30/DRc2e8spviLXDHu3Ljh55RaMPqRqcMszl/oJiIjJOVXEkJwZLSquxPstEeekOA7VvTeakorOdY4/50ouSZiJQZdMdeYU+huZb0LjPlzzvbO3JFa+Z3p2fav7nOLUqxuN3ql7y73QupysKNAyVfMVNw3FNTPvJ5qpVf6hcku9bjnP6JNI9VQ3uP0OPCegzQ677DPROUPtXNgb0dY70eYV++rBGYmiRnJ1YhV2CXjBLru84sVazQ6HHNBj/w4cF1k9Dnh9a2ddp2UVZ3X+FJu2+DqeXa9e3luvz+/gyy80UTcvY1/a+G5fWLUb/58QMfNc3NbqndwTgv8AAAD//wEAAP//B1tMMAB4nGJgZgCD/+cYjBiwAAAAAAD//wEAAP//LwECAwAAAA==\");\n}]]></style><style type=\"text/css\"><![CDATA[.shape {\n  shape-rendering: geometricPrecision;\n  stroke-linejoin: round;\n}\n.connection {\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.blend {\n  mix-blend-mode: multiply;\n  opacity: 0.5;\n}\n\n\t\t.d2-3508604964 .fill-N1{fill:#0A0F25;}\n\t\t.d2-3508604964 .fill-N2{fill:#676C7E;}\n\t\t.d2-3508604964 .fill-N3{fill:#9499AB;}\n\t\t.d2-3508604964 .fill-N4{fill:#CFD2DD;}\n\t\t.d2-3508604964 .fill-N5{fill:#DEE1EB;}\n\t\t.d2-3508604964 .fill-N6{fill:#EEF1F8;}\n\t\t.d2-3508604964 .fill-N7{fill:#FFFFFF;}\n\t\t.d2-3508604964 .fill-B1{fill:#0D32B2;}\n\t\t.d2-3508604964 .fill-B2{fill:#0D32B2;}\n\t\t.d2-3508604964 .fill-B3{fill:#E3E9FD;}\n\t\t.d2-3508604964 .fill-B4{fill:#E3E9FD;}\n\t\t.d2-3508604964 .fill-B5{fill:#EDF0FD;}\n\t\t.d2-3508604964 .fill-B6{fill:#F7F8FE;}\n\t\t.d2-3508604964 .fill-AA2{fill:#4A6FF3;}\n\t\t.d2-3508604964 .fill-AA4{fill:#EDF0FD;}\n\t\t.d2-3508604964 .fill-AA5{fill:#F7F8FE;}\n\t\t.d2-3508604964 .fill-AB4{fill:#EDF0FD;}\n\t\t.d2-3508604964 .fill-AB5{fill:#F7F8FE;}\n\t\t.d2-3508604964 .stroke-N1{stroke:#0A0F25;}\n\t\t.d2-3508604964 .stroke-N2{stroke:#676C7E;}\n\t\t.d2-3508604964 .stroke-N3{stroke:#9499AB;}\n\t\t.d2-3508604964 .stroke-N4{stroke:#CFD2DD;}\n\t\t.d2-3508604964 .stroke-N5{stroke:#DEE1EB;}\n\t\t.d2-3508604964 .stroke-N6{stroke:#EEF1F8;}\n\t\t.d2-3508604964 .stroke-N7{stroke:#FFFFFF;}\n\t\t.d2-3508604964 .stroke-B1{stroke:#0D32B2;}\n\t\t.d2-3508604964 .stroke-B2{stroke:#0D32B2;}\n\t\t.d2-3508604964 .stroke-B3{stroke:#E3E9FD;}\n\t\t.d2-3508604964 .stroke-B4{stroke:#E3E9FD;}\n\t\t.d2-3508604964 .stroke-B5{stroke:#EDF0FD;}\n\t\t.d2-3508604964 .stroke-B6{stroke:#F7F8FE;}\n\t\t.d2-3508604964 .stroke-AA2{stroke:#4A6FF3;}\n\t\t.d2-3508604964 .stroke-AA4{stroke:#EDF0FD;}\n\t\t.d2-3508604964 .stroke-AA5{stroke:#F7F8FE;}\n\t\t.d2-3508604964 .stroke-AB4{stroke:#EDF0FD;}\n\t\t.d2-3508604964 .stroke-AB5{stroke:#F7F8FE;}\n\t\t.d2-3508604964 .background-color-N1{background-color:#0A0F25;}\n\t\t.d2-3508604964 .background-color-N2{background-color:#676C7E;}\n\t\t.d2-3508604964 .background-color-N3{background-color:#9499AB;}\n\t\t.d2-3508604964 .background-color-N4{background-color:#CFD2DD;}\n\t\t.d2-3508604964 .background-color-N5{background-color:#DEE1EB;}\n\t\t.d2-3508604964 .background-color-N6{background-color:#EEF1F8;}\n\t\t.d2-3508604964 .background-color-N7{background-color:#FFFFFF;}\n\t\t.d2-3508604964 .background-color-B1{background-color:#0D32B2;}\n\t\t.d2-3508604964 .background-color-B2{background-color:#0D32B2;}\n\t\t.d2-3508604964 .background-color-B3{background-color:#E3E9FD;}\n\t\t.d2-3508604964 .background-color-B4{background-color:#E3E9FD;}\n\t\t.d2-3508604964 .background-color-B5{background-color:#EDF0FD;}\n\t\t.d2-3508604964 .background-color-B6{background-color:#F7F8FE;}\n\t\t.d2-3508604964 .background-color-AA2{background-color:#4A6FF3;}\n\t\t.d2-3508604964 .background-color-AA4{background-color:#EDF0FD;}\n\t\t.d2-3508604964 .background-color-AA5{background-color:#F7F8FE;}\n\t\t.d2-3508604964 .background-color-AB4{background-color:#EDF0FD;}\n\t\t.d2-3508604964 .background-color-AB5{background-color:#F7F8FE;}\n\t\t.d2-3508604964 .color-N1{color:#0A0F25;}\n\t\t.d2-3508604964 .color-N2{color:#676C7E;}\n\t\t.d2-3508604964 .color-N3{color:#9499AB;}\n\t\t.d2-3508604964 .color-N4{color:#CFD2DD;}\n\t\t.d2-3508604964 .color-N5{color:#DEE1EB;}\n\t\t.d2-3508604964 .color-N6{color:#EEF1F8;}\n\t\t.d2-3508604964 .color-N7{color:#FFFFFF;}\n\t\t.d2-3508604964 .color-B1{color:#0D32B2;}\n\t\t.d2-3508604964 .color-B2{color:#0D32B2;}\n\t\t.d2-3508604964 .color-B3{color:#E3E9FD;}\n\t\t.d2-3508604964 .color-B4{color:#E3E9FD;}\n\t\t.d2-3508604964 .color-B5{color:#EDF0FD;}\n\t\t.d2-3508604964 .color-B6{color:#F7F8FE;}\n\t\t.d2-3508604964 .color-AA2{color:#4A6FF3;}\n\t\t.d2-3508604964 .color-AA4{color:#EDF0FD;}\n\t\t.d2-3508604964 .color-AA5{color:#F7F8FE;}\n\t\t.d2-3508604964 .color-AB4{color:#EDF0FD;}\n\t\t.d2-3508604964 .color-AB5{color:#F7F8FE;}.appendix text.text{fill:#0A0F25}.md{--color-fg-default:#0A0F25;--color-fg-muted:#676C7E;--color-fg-subtle:#9499AB;--color-canvas-default:#FFFFFF;--color-canvas-subtle:#EEF1F8;--color-border-default:#0D32B2;--color-border-muted:#0D32B2;--color-neutral-muted:#EEF1F8;--color-accent-fg:#0D32B2;--color-accent-emphasis:#0D32B2;--color-attention-subtle:#676C7E;--color-danger-fg:red;}.sketch-overlay-B1{fill:url(#streaks-darker-d2-3508604964);mix-blend-mode:lighten}.sketch-overlay-B2{fill:url(#streaks-darker-d2-3508604964);mix-blend-mode:lighten}.sketch-overlay-B3{fill:url(#streaks-bright-d2-3508604964);mix-blend-mode:darken}.sketch-overlay-B4{fill:url(#streaks-bright-d2-3508604964);mix-blend-mode:darken}.sketch-overlay-B5{fill:url(#streaks-bright-d2-3508604964);mix-blend-mode:darken}.sketch-overlay-B6{fill:url(#streaks-bright-d2-3508604964);mix-blend-mode:darken}.sketch-overlay-AA2{fill:url(#streaks-dark-d2-3508604964);mix-blend-mode:overlay}.sketch-overlay-AA4{fill:url(#streaks-bright-d2-3508604964);mix-blend-mode:darken}.sketch-overlay-AA5{fill:url(#streaks-bright-d2-3508604964);mix-blend-mode:darken}.sketch-overlay-AB4{fill:url(#streaks-bright-d2-3508604964);mix-blend-mode:darken}.sketch-overlay-AB5{fill:url(#streaks-bright-d2-3508604964);mix-blend-mode:darken}.sketch-overlay-N1{fill:url(#streaks-darker-d2-3508604964);mix-blend-mode:lighten}.sketch-overlay-N2{fill:url(#streaks-dark-d2-3508604964);mix-blend-mode:overlay}.sketch-overlay-N3{fill:url(#streaks-normal-d2-3508604964);mix-blend-mode:color-burn}.sketch-overlay-N4{fill:url(#streaks-normal-d2-3508604964);mix-blend-mode:color-burn}.sketch-overlay-N5{fill:url(#streaks-bright-d2-3508604964);mix-blend-mode:darken}.sketch-overlay-N6{fill:url(#streaks-bright-d2-3508604964);mix-blend-mode:darken}.sketch-overlay-N7{fill:url(#streaks-bright-d2-3508604964);mix-blend-mode:darken}.light-code{display: block}.dark-code{display: none}]]></style><g class=\"VXNlcg==\"><g class=\"shape\" ><rect x=\"151.000000\" y=\"272.000000\" width=\"74.000000\" height=\"36.000000\" stroke=\"#0A0F25\" fill=\"#FFFFFF\" class=\"shape stroke-N1 fill-N7\" style=\"stroke-width:2;\" /><rect x=\"151.000000\" y=\"272.000000\" width=\"74.000000\" height=\"36.000000\" fill=\"#0A0F25\" class=\"class_header fill-N1\" /><text x=\"161.000000\" y=\"297.750000\" fill=\"#FFFFFF\" class=\"text fill-N7\" style=\"text-anchor:start;font-size:24px\">User</text></g></g><g class=\"UG9zdA==\"><g class=\"shape\" ><rect x=\"114.000000\" y=\"136.000000\" width=\"72.000000\" height=\"36.000000\" stroke=\"#0A0F25\" fill=\"#FFFFFF\" class=\"shape stroke-N1 fill-N7\" style=\"stroke-width:2;\" /><rect x=\"114.000000\" y=\"136.000000\" width=\"72.000000\" height=\"36.000000\" fill=\"#0A0F25\" class=\"class_header fill-N1\" /><text x=\"124.000000\" y=\"161.750000\" fill=\"#FFFFFF\" class=\"text fill-N7\" style=\"text-anchor:start;font-size:24px\">Post</text></g></g><g class=\"VGFn\"><g class=\"shape\" ><rect x=\"0.000000\" y=\"0.000000\" width=\"64.000000\" height=\"36.000000\" stroke=\"#0A0F25\" fill=\"#FFFFFF\" class=\"shape stroke-N1 fill-N7\" style=\"stroke-width:2;\" /><rect x=\"0.000000\" y=\"0.000000\" width=\"64.000000\" height=\"36.000000\" fill=\"#0A0F25\" class=\"class_header fill-N1\" /><text x=\"10.000000\" y=\"25.750000\" fill=\"#FFFFFF\" class=\"text fill-N7\" style=\"text-anchor:start;font-size:24px\">Tag</text></g></g><g class=\"Q29tbWVudA==\"><g class=\"shape\" ><rect x=\"124.000000\" y=\"0.000000\" width=\"128.000000\" height=\"36.000000\" stroke=\"#0A0F25\" fill=\"#FFFFFF\" class=\"shape stroke-N1 fill-N7\" style=\"stroke-width:2;\" /><rect x=\"124.000000\" y=\"0.000000\" width=\"128.000000\" height=\"36.000000\" fill=\"#0A0F25\" class=\"class_header fill-N1\" /><text x=\"134.000000\" y=\"25.750000\" fill=\"#FFFFFF\" class=\"text fill-N7\" style=\"text-anchor:start;font-size:24px\">Comment</text></g></g><g class=\"KFBvc3QgLSZndDsgVXNlcilbMF0=\"><marker id=\"mk-d2-3508604964-3488378134\" markerWidth=\"10.000000\" markerHeight=\"12.000000\" refX=\"7.000000\" refY=\"6.000000\" viewBox=\"0.000000 0.000000 10.000000 12.000000\" orient=\"auto\" markerUnits=\"userSpaceOnUse\"> <polygon points=\"0.000000,0.000000 10.000000,6.000000 0.000000,12.000000\" fill=\"#0D32B2\" class=\"connection fill-B1\" stroke-width=\"2\" /> </marker><path d=\"M 150.000000 174.000000 C 150.000000 212.000000 155.600006 232.000000 176.045587 268.509976\" stroke=\"#0D32B2\" fill=\"none\" class=\"connection stroke-B1\" style=\"stroke-width:2;\" marker-end=\"url(#mk-d2-3508604964-3488378134)\" mask=\"url(#d2-3508604964)\" /></g><g class=\"KENvbW1lbnQgLSZndDsgUG9zdClbMF0=\"><path d=\"M 177.022793 37.745012 C 155.600006 76.000000 150.000000 96.000000 150.000000 132.000000\" stroke=\"#0D32B2\" fill=\"none\" class=\"connection stroke-B1\" style=\"stroke-width:2;\" marker-end=\"url(#mk-d2-3508604964-3488378134)\" mask=\"url(#d2-3508604964)\" /></g><g class=\"KENvbW1lbnQgLSZndDsgVXNlcilbMF0=\"><path d=\"M 198.977207 37.745012 C 220.399994 76.000000 226.000000 99.599998 226.000000 120.000000 C 226.000000 140.399994 220.399994 232.000000 199.954413 268.509976\" stroke=\"#0D32B2\" fill=\"none\" class=\"connection stroke-B1\" style=\"stroke-width:2;\" marker-end=\"url(#mk-d2-3508604964-3488378134)\" mask=\"url(#d2-3508604964)\" /></g><mask id=\"d2-3508604964\" maskUnits=\"userSpaceOnUse\" x=\"-101\" y=\"-101\" width=\"454\" height=\"510\">\n<rect x=\"-101\" y=\"-101\" width=\"454\" height=\"510\" fill=\"white\"></rect>\n\n</mask></svg></svg>";
export const models = [
  {
    "name": "User",
    "structure": [
      {
        "name": "email",
        "type": "String",
        "options": {
          "required": true,
          "unique": true
        },
        "children": []
      },
      {
        "name": "name",
        "type": "String",
        "options": {
          "required": true,
          "unique": false
        },
        "children": []
      },
      {
        "name": "roles",
        "type": "Array",
        "options": {
          "required": false,
          "unique": false
        },
        "children": [
          {
            "name": "item",
            "type": "String",
            "options": {
              "required": false,
              "unique": false
            }
          }
        ]
      },
      {
        "name": "profile",
        "type": "Embedded",
        "options": {
          "required": false
        },
        "children": [
          {
            "name": "bio",
            "type": "String",
            "options": {
              "required": false,
              "unique": false
            },
            "children": []
          },
          {
            "name": "avatarUrl",
            "type": "String",
            "options": {
              "required": false,
              "unique": false
            },
            "children": []
          }
        ]
      },
      {
        "name": "_id",
        "type": "ObjectId",
        "options": {
          "required": false,
          "unique": false
        },
        "children": []
      },
      {
        "name": "__v",
        "type": "Number",
        "options": {
          "required": false,
          "unique": false
        },
        "children": []
      }
    ],
    "methods": {
      "instanceMethods": [
        "displayName"
      ],
      "staticMethods": [
        "findByEmail"
      ]
    }
  },
  {
    "name": "Post",
    "structure": [
      {
        "name": "title",
        "type": "String",
        "options": {
          "required": true,
          "unique": false
        },
        "children": []
      },
      {
        "name": "slug",
        "type": "String",
        "options": {
          "required": true,
          "unique": true
        },
        "children": []
      },
      {
        "name": "body",
        "type": "String",
        "options": {
          "required": false,
          "unique": false
        },
        "children": []
      },
      {
        "name": "published",
        "type": "Boolean",
        "options": {
          "required": true,
          "unique": false
        },
        "children": []
      },
      {
        "name": "author",
        "type": "ObjectId",
        "options": {
          "required": true,
          "unique": false,
          "ref": "User"
        },
        "children": []
      },
      {
        "name": "tags",
        "type": "Array",
        "options": {
          "required": false,
          "unique": false
        },
        "children": [
          {
            "name": "item",
            "type": "ObjectId",
            "options": {
              "required": false,
              "unique": false,
              "ref": "Tag"
            }
          }
        ]
      },
      {
        "name": "revisions",
        "type": "Array",
        "options": {
          "required": false,
          "unique": false
        },
        "children": [
          {
            "name": "editedAt",
            "type": "Date",
            "options": {
              "required": false,
              "unique": false
            },
            "children": []
          },
          {
            "name": "editedBy",
            "type": "ObjectId",
            "options": {
              "required": false,
              "unique": false,
              "ref": "User"
            },
            "children": []
          },
          {
            "name": "_id",
            "type": "ObjectId",
            "options": {
              "required": false,
              "unique": false
            },
            "children": []
          }
        ]
      },
      {
        "name": "_id",
        "type": "ObjectId",
        "options": {
          "required": false,
          "unique": false
        },
        "children": []
      },
      {
        "name": "__v",
        "type": "Number",
        "options": {
          "required": false,
          "unique": false
        },
        "children": []
      }
    ],
    "methods": {
      "instanceMethods": [],
      "staticMethods": []
    }
  },
  {
    "name": "Tag",
    "structure": [
      {
        "name": "label",
        "type": "String",
        "options": {
          "required": true,
          "unique": true
        },
        "children": []
      },
      {
        "name": "colour",
        "type": "String",
        "options": {
          "required": false,
          "unique": false
        },
        "children": []
      },
      {
        "name": "_id",
        "type": "ObjectId",
        "options": {
          "required": false,
          "unique": false
        },
        "children": []
      },
      {
        "name": "__v",
        "type": "Number",
        "options": {
          "required": false,
          "unique": false
        },
        "children": []
      }
    ],
    "methods": {
      "instanceMethods": [],
      "staticMethods": []
    }
  },
  {
    "name": "Comment",
    "structure": [
      {
        "name": "post",
        "type": "ObjectId",
        "options": {
          "required": true,
          "unique": false,
          "ref": "Post"
        },
        "children": []
      },
      {
        "name": "author",
        "type": "ObjectId",
        "options": {
          "required": true,
          "unique": false,
          "ref": "User"
        },
        "children": []
      },
      {
        "name": "body",
        "type": "String",
        "options": {
          "required": true,
          "unique": false
        },
        "children": []
      },
      {
        "name": "createdAt",
        "type": "Date",
        "options": {
          "required": false,
          "unique": false
        },
        "children": []
      },
      {
        "name": "_id",
        "type": "ObjectId",
        "options": {
          "required": false,
          "unique": false
        },
        "children": []
      },
      {
        "name": "__v",
        "type": "Number",
        "options": {
          "required": false,
          "unique": false
        },
        "children": []
      }
    ],
    "methods": {
      "instanceMethods": [],
      "staticMethods": []
    }
  }
] as const;
