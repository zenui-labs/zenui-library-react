import React, {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ShowCode from "@shared/Component/ShowCode.jsx";
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";

// contents for scrollspy
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.js';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import {
    DragAnimationContents
} from "@utils/ContentsConfig/AnimationContents/LayoutContents.js";
import {DragPositionLockExample} from "@animations/Layouts/DragAnimations/DragPositionLockExample.jsx";
import {ThreedDragStackExample} from "@animations/Layouts/DragAnimations/ThreedDragStackExample.jsx";
import DragAndDropExample from "@animations/Layouts/DragAnimations/DragAndDropExample.jsx";

const Index = () => {
    const sectionIds = DragAnimationContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [dragAndDropExamplePreview, setDragAndDropExamplePreview] = useState(true);
    const [dragAndDropExampleCode, setDragAndDropExampleCode] = useState(false);

    const [dragPositionLockExamplePreview, setDragPositionLockExamplePreview] = useState(true);
    const [dragPositionLockExampleCode, setDragPositionLockExampleCode] = useState(false);

    const [threedDragStackExamplePreview, setThreedDragStackExamplePreview] = useState(true);
    const [threedDragStackExampleCode, setThreedDragStackExampleCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"drag & drop animation"} id={"drag-&-drop-animation"}/>

                <ComponentDescription
                    text='Drag & drop animation adds visual feedback during item movement, enhancing UX with smooth transitions as items are dragged and repositioned.'/>

                <ToggleTab setCode={setDragAndDropExampleCode} code={dragAndDropExampleCode}
                           setPreview={setDragAndDropExamplePreview} preview={dragAndDropExamplePreview}/>

                <ComponentWrapper>
                    {dragAndDropExamplePreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <DragAndDropExample/>
                        </div>
                    )}

                    {dragAndDropExampleCode &&
                        <ShowCode code='
import React, {useState, useRef} from "react";
import {motion, useMotionValue, AnimatePresence} from "framer-motion";

const DragAndDropAnimation = () => {
    const [items, setItems] = useState([
        {id: "1", title: "Complete report", category: "Work", priority: 3, color: "bg-blue-400"},
        {id: "2", title: "Buy groceries", category: "Personal", priority: 2, color: "bg-green-400"},
        {id: "3", title: "Call client", category: "Work", priority: 4, color: "bg-yellow-400"},
        {id: "4", title: "Fix bug in code", category: "Work", priority: 5, color: "bg-pink-400"},
        {id: "5", title: "Doctor appointment", category: "Personal", priority: 4, color: "bg-purple-400"},
        {id: "6", title: "Submit proposal", category: "Urgent", priority: 5, color: "bg-red-400"},
        {id: "7", title: "Gym workout", category: "Personal", priority: 1, color: "bg-indigo-400"},
        {id: "8", title: "Team meeting", category: "Work", priority: 3, color: "bg-teal-400"}
    ]);

    const findIndex = (id) => items.findIndex((item) => item.id === id);

    const findPosition = (id) => {
        const index = findIndex(id);
        const item = items[index];
        return {index, item};
    };

    const moveItem = (fromId, toId) => {
        setItems((prevItems) => {
            const newItems = [...prevItems];
            const fromIndex = prevItems.findIndex(item => item.id === fromId);
            const toIndex = prevItems.findIndex(item => item.id === toId);

            if (fromIndex !== -1 && toIndex !== -1) {
                const [movedItem] = newItems.splice(fromIndex, 1);
                newItems.splice(toIndex, 0, movedItem);
            }

            return newItems;
        });
    };

    const sensors = {
        mouse: useRef({}),
        touch: useRef({}),
    };

    return (
        <AnimatePresence>
            {items.map((item) => (
                <Item
                    key={item.id}
                    id={item.id}
                    item={item}
                    color={item.color}
                    moveItem={moveItem}
                    findPosition={findPosition}
                    sensors={sensors}
                />
            ))}
        </AnimatePresence>
    );
}

const Item = ({id, item, color, moveItem, findPosition, sensors}) => {
    const [isDragging, setIsDragging] = useState(false);

    const dragOriginX = useMotionValue(0);
    const dragOriginY = useMotionValue(0);

    const onDragStart = () => {
        setIsDragging(true);
    };

    const onDragEnd = () => {
        setIsDragging(false);
        dragOriginX.set(0);
        dragOriginY.set(0);
    };

    const onDrag = (event, info) => {
        const targetElement = document.elementFromPoint(info.point.x, info.point.y);
        const targetId = targetElement?.closest("[data-id]")?.dataset?.id;

        if (targetId && targetId !== id) {
            moveItem(id, targetId);
        }
    };

    return (
        <motion.div
            layout
            data-id={id}
            drag
            dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
            dragElastic={0.4}
            dragOriginX={dragOriginX}
            dragOriginY={dragOriginY}
            whileDrag={{
                scale: 1.05,
                zIndex: 10,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.2)"
            }}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            className={`${color} p-6 w-full rounded-lg cursor-grab shadow-md`}
            initial={{opacity: 0, scale: 0.8}}
            animate={{
                opacity: 1,
                scale: 1,
                boxShadow: isDragging
                    ? "0px 10px 25px rgba(0,0,0,0.2)"
                    : "0px 4px 8px rgba(0,0,0,0.1)"
            }}
            exit={{opacity: 0, scale: 0.8}}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 17,
            }}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <span className="text-xs text-white text-opacity-80">{item.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-white bg-black bg-opacity-20 px-2 py-1 rounded-full text-xs">
                    Priority: {item.priority}
                  </span>
                </div>
            </div>
        </motion.div>
    );
};

export default DragAndDropAnimation;
                        '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"drag position lock"} id={"drag-position-lock"}/>
                </div>

                <ComponentDescription
                    text='Drag position lock restricts a draggable item to its last dropped position, preventing further movement until unlocked.'/>

                <ToggleTab setCode={setDragPositionLockExampleCode} code={dragPositionLockExampleCode}
                           setPreview={setDragPositionLockExamplePreview} preview={dragPositionLockExamplePreview}/>

                <ComponentWrapper>
                    {dragPositionLockExamplePreview && (
                        <div className="px-8 py-16 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <DragPositionLockExample/>
                        </div>
                    )}

                    {dragPositionLockExampleCode &&
                        <ShowCode code='
import {motion} from "framer-motion";

const DragPositionLock = () => {
    return (
        <motion.img src="/logo.png" alt="zenui-logo"
                    className="w-[200px] dark:bg-slate-800 shadow-[2px_1px_20px_rgba(0,0,0,0.07)] !cursor-grab rounded-high p-6"
                    drag
                    dragDirectionLock
                    dragConstraints={{top: 0, right: 0, bottom: 0, left: 0}}
                    dragTransition={{bounceStiffness: 600, bounceDamping: 20}}
                    dragElastic={0.5}
                    whileTap={{cursor: "grabbing"}}

        />
    );
}

export default DragPositionLock;
                        '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"3d drag stack"} id={"3d-drag-stack"}/>
                </div>

                <ComponentDescription
                    text='3D drag stack displays items layered in 3D space, allowing users to drag and rotate the stack, simulating depth and realistic movement.'/>

                <ToggleTab setCode={setThreedDragStackExampleCode} code={threedDragStackExampleCode}
                           setPreview={setThreedDragStackExamplePreview} preview={threedDragStackExamplePreview}/>

                <ComponentWrapper>
                    {threedDragStackExamplePreview && (
                        <div className="px-8 py-16 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ThreedDragStackExample/>
                        </div>
                    )}

                    {threedDragStackExampleCode &&
                        <ShowCode code='
import {useState} from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence
} from "framer-motion";

const ThreedDragStack = () => {
    const [index, setIndex] = useState(0);

    return (
        <motion.div style={{width: 200, height: 200, position: "relative"}}>
            <AnimatePresence initial={false}>
                <Card key={index + 1} frontCard={false}/>
                <Card
                    key={index}
                    frontCard={true}
                    index={index}
                    setIndex={setIndex}
                    drag="x"
                />
            </AnimatePresence>
        </motion.div>
    );
}

export default ThreedDragStack;

function Card(props) {
    const [exitX, setExitX] = useState(0);

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
        clamp: false
    });

    const variantsFrontCard = {
        animate: {scale: 1, y: 0, opacity: 1},
        exit: (custom) => ({
            x: custom,
            opacity: 0,
            scale: 0.5,
            transition: {duration: 0.2}
        })
    };
    const variantsBackCard = {
        initial: {scale: 0, y: 105, opacity: 0},
        animate: {scale: 0.75, y: 35, opacity: 0.5}
    };

    function handleDragEnd(_, info) {
        if (info.offset.x < -100) {
            setExitX(-250);
            props.setIndex(props.index + 1);
        }
        if (info.offset.x > 100) {
            setExitX(250);
            props.setIndex(props.index + 1);
        }
    }

    return (
        <motion.div
            style={{
                width: 200,
                height: 200,
                position: "absolute",
                top: 0,
                x,
                rotate,
                cursor: "grab"
            }}
            variants={props.frontCard ? variantsFrontCard : variantsBackCard}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={exitX}
            transition={
                props.frontCard
                    ? {type: "spring", stiffness: 300, damping: 20}
                    : {scale: {duration: 0.2}, opacity: {duration: 0.4}}
            }
        >
            <motion.img src="/logo.png" alt="zenui-logo"
                        className="w-full bg-white dark:bg-slate-800 shadow-[2px_1px_20px_rgba(0,0,0,0.07)] !cursor-grab rounded-high p-6"
                        scale
                        whileTap={{cursor: "grabbing"}}
                        drag={props.drag}
                        dragConstraints={{top: 0, right: 0, bottom: 0, left: 0}}
                        onDragEnd={handleDragEnd}
            />
        </motion.div>
    );
}
                        '
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/animations/layout-switcher' backName='layout switcher'
                                forwardUrl='/animations/animated-accordion' forwardName='animated accordion'/>
            </div>

            <ContentNavbar contents={DragAnimationContents} activeSection={activeSection}/>

            <Helmet>
                <title>Layouts - Drag Animations</title>
            </Helmet>
        </aside>
    );
};

export default Index;
