/**
 * Rendered for tabs created via react-layman's "new tab" toolbar button.
 * That button always creates a `TabData("blank")`, so `renderPane` in
 * `LayoutPage.tsx` maps the `"blank"` tab name to this page.
 */
export function NewTab() {
    return (
        <div className="w-full h-full overflow-auto">
            <div className="w-full min-h-full grid place-content-center p-8">
                <div className="flex flex-col items-center container mx-auto">
                    <div className="text-2xl mb-4 text-center">
                        This is a blank tab. Split, float, or close it using
                        the toolbar above!
                    </div>
                </div>
            </div>
        </div>
    );
}
