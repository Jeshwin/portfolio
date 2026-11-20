import {test} from "node:test";
import assert from "node:assert/strict";
import {contentPathForKey, imageKey, isAuthorized, parseAdminPath, postKey} from "./admin-routes.js";

test("parseAdminPath accepts posts and images", () => {
    assert.deepEqual(parseAdminPath("/admin/posts/my-post"), {slug: "my-post", file: null});
    assert.deepEqual(parseAdminPath("/admin/posts/my-post/images/ide.png"), {
        slug: "my-post",
        file: "ide.png",
    });
});

test("parseAdminPath rejects traversal and junk", () => {
    for (const p of [
        "/admin/posts/../x",
        "/admin/posts/%2e%2e",
        "/admin/posts/Caps",
        "/admin/posts/a--b",
        "/admin/posts/",
        "/admin/posts/x/images/.hidden.png",
        "/admin/posts/x/images/run.js",
        "/admin/posts/x/images/a/b.png",
        "/admin/other/x",
    ]) {
        assert.equal(parseAdminPath(p), null, p);
    }
});

test("isAuthorized", () => {
    assert.equal(isAuthorized("Bearer s3cret", "s3cret"), true);
    assert.equal(isAuthorized("Bearer s3creT", "s3cret"), false);
    assert.equal(isAuthorized("Bearer s3cret", ""), false); // unset secret fails closed
    assert.equal(isAuthorized(null, "s3cret"), false);
    assert.equal(isAuthorized("s3cret", "s3cret"), false);
});

test("contentPathForKey round-trips and rejects junk", () => {
    assert.equal(contentPathForKey(postKey("my-post")), "my-post.md");
    assert.equal(contentPathForKey(imageKey("my-post", "ide.png")), "my-post/ide.png");
    for (const k of ["README", "post/../x.md", "img/x/../../a.png", "img/x/a.js", "post/x.txt"]) {
        assert.equal(contentPathForKey(k), null, k);
    }
});
