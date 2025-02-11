export function tooltip(node: any, tooltipText: string) {
    node.classList.add('tooltip');
    node.setAttribute('tabindex', 0);

    function handleFocus() {
        const child = document.createElement('span');
        child.textContent = tooltipText;
        child.setAttribute('id', 'tooltip');
        node.appendChild(child);

        node.addEventListener('mouseleave', handleBlur)
        node.addEventListener('blur', handleBlur)
        node.removeEventListener('mouseenter', handleFocus)
        node.removeEventListener('focus', handleFocus)
    }

    function handleBlur() {
        node.removeChild(node.querySelector('#tooltip'));

        node.removeEventListener('mouseleave', handleBlur)
        node.removeEventListener('blur', handleBlur)
        node.addEventListener('mouseenter', handleFocus)
        node.addEventListener('focus', handleFocus)
    }

    node.addEventListener('mouseenter', handleFocus)
    node.addEventListener('focus', handleFocus)

    return {
        destroy() {
            node.classList.remove('tooltip');
            node.removeEventListener('mouseenter', handleFocus)
            node.removeEventListener('focus', handleFocus)
        }
    }
}