import { useCallback, useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import type { ReactNode } from 'react';


/**
 * useConfirm Hook
 *
 * Provides a generic, promise-based confirmation dialog.
 *
 * - Call `const { confirm, modal } = useConfirm<T>()`
 * - Render `{modal}` somewhere in your component tree.
 * - Use `await confirm(options)` in event handlers to show a modal
 *   and wait for the user’s choice.
 *
 * Features:
 * - Returns a Promise that resolves to `false` (cancel) or the payload you passed in (confirm).
 * - Content can be static JSX or a render function that receives the payload.
 * - Supports custom title, labels, button intent (danger/success/default), etc.
 *
 * Example:
 *   const { confirm, modal } = useConfirm<User>();
 *
 *   async function onDelete(user: User) {
 *     const res = await confirm({
 *       title: 'Delete user?',
 *       payload: user,
 *       intent: 'danger',
 *       content: (u) => `Delete user "${u?.name}"?`
 *     });
 *     if (res) { deleteUser(res.id); }
 *   }
 *
 *   return <>{modal}<Button onClick={() => onDelete(someUser)}>Delete</Button></>
 */




type ConfirmIntent = 'default' | 'danger' | 'success';

export type ConfirmOptions<TPayload = unknown> = {
    /** Überschrift des Modals */
    title?: ReactNode;
    /** Hauptinhalt – kann JSX sein */
    content?: ReactNode | ((payload?: TPayload) => ReactNode);
    /** Beschriftungen */
    confirmLabel?: ReactNode;
    cancelLabel?: ReactNode;
    /** Button-Intent / Farbe */
    intent?: ConfirmIntent;
    /** Modal-Props (nur kleine Auswahl – erweiterbar) */
    centered?: boolean;
    /** Optional: Payload wird an content-Fn gereicht und bei Erfolg zurückgegeben */
    payload?: TPayload;
    /** Optional: Deaktiviert Buttons während async-Work (wenn du extern sperrst) */
    busy?: boolean;
};

type Resolver<TPayload> = (value: false | TPayload) => void;

export function useConfirm<TPayload = unknown>() {
    const [opened, setOpened] = useState(false);
    const [opts, setOpts] = useState<ConfirmOptions<TPayload>>({});
    const [resolver, setResolver] = useState<Resolver<TPayload> | null>(null);

    const confirm = useCallback((options: ConfirmOptions<TPayload> = {}) => {
        setOpts(options);
        setOpened(true);

        // returns promise and stores the resolver in the resolve state
        return new Promise<false | TPayload>((resolve) => setResolver(() => resolve));
    }, []);

    function handleCancel() {
        setOpened(false);
        resolver?.(false);
        setResolver(null);
    }

    function handleOk() {
        setOpened(false);

        // if payload is set, it returns the payload instead of true
        resolver?.(opts.payload as TPayload ?? (true as unknown as TPayload));
        setResolver(null);
    }

    const intentColor =
        opts.intent === 'danger' ? 'red' :
            opts.intent === 'success' ? 'green' :
                undefined;

    const modal = (
        <Modal
            opened={opened}
            onClose={handleCancel}
            title={opts.title ?? 'Please confirm'}
            centered={opts.centered ?? true}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            {typeof opts.content === 'function'
                ? opts.content(opts.payload)
                : opts.content}

            <Group mt="md" justify="flex-end">
                <Button variant="default" onClick={handleCancel} disabled={!!opts.busy}>
                    {opts.cancelLabel ?? 'Cancel'}
                </Button>
                <Button color={intentColor} onClick={handleOk} loading={!!opts.busy}>
                    {opts.confirmLabel ?? 'OK'}
                </Button>
            </Group>
        </Modal>
    );

    return { confirm, modal };
}
