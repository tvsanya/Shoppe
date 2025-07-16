<template>
    <div class="checkbox__statuses">
        <div class="checkbox__status">
            <span>On Sale</span>
            <input type="checkbox" id="status_one" class="status__toggle" />
            <label for="status_one"></label>
        </div>
        <div class="checkbox__status">
            <span>In stock</span>
            <input type="checkbox" id="status_two" class="status__toggle" />
            <label for="status_two"></label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.checkbox__statuses {
    display: flex;
    flex-direction: column;
    gap: 42px 0;

    .checkbox__status {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        user-select: none;

        span {
            @include h5(#000000);
        }

        .status__toggle {
            display: none;
        }

        .status__toggle + label {
            display: block;
            width: 34px;
            height: 20px;
            background-color: #707070;
            border-radius: 17px;
            position: relative;
            cursor: pointer;

            &::after {
                content: '';
                position: absolute;
                top: 4px;
                left: 4px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: #fff;
                transition: transform 0.3s;
            }
        }

        .status__toggle:checked + label {
            background-color: #a18a68;

            &::after {
                transform: translateX(14px);
            }
        }
    }
}
</style>
