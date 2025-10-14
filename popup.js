function defineTool(name, automationScope, automationMethod) {
    return {
        [name]: args => {
            console.debug(`[${name}]`, args);

            return browser.tabs
                .sendMessage(0, {
                    automationScope,
                    automationMethod,
                    args
                });
        }
    };
}


const CLIENT_TOOLS = {
    ...defineTool("take_dom_snapshot", "see", "domSnapshot"),
    ...defineTool("mouse_move", "act", "mouseMove"),
    ...defineTool("scroll", "act", "scroll"),
    ...defineTool("click", "act", "click"),
    ...defineTool("type", "act", "type"),
    ...defineTool("text_select", "act", "textSelect"),
    ...defineTool("navigate", null, "navigate"),
    ...defineTool("get_current_location", "custom", "getCurrentLocation"),
};


function init() {
    const el = document.createElement("elevenlabs-convai");
    el.setAttribute("agent-id", browser.webfuseSession.env.AGENT_KEY);
    document.body.appendChild(el);

    el.addEventListener("elevenlabs-convai:call", (event) => {
        event.detail.config.clientTools = CLIENT_TOOLS;
    });
}


document.addEventListener("DOMContentLoaded", init);